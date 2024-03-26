import { db, storage } from '../firebase';
import { collection, addDoc, getDocs, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const productsCollectionRef = collection(db, "products");

const getProducts = async () => {
    try {
        const data = await getDocs(productsCollectionRef);
        return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
        console.error("Error fetching products: ", error);
        throw error;
    }
};

const getFeaturedProducts = async () => {
    try {
        const q = query(productsCollectionRef, where("featured", "==", true));
        const data = await getDocs(q);
        return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
        console.error("Error fetching featured products: ", error);
        throw error;
    }
};

const addProduct = async (productData) => {
    try {
        const docRef = await addDoc(productsCollectionRef, productData);
        return docRef.id; // Returns the newly created document's ID
    } catch (error) {
        console.error("Error adding product: ", error);
        throw error;
    }
};

const uploadProductImage = async (imageFile) => {
    if (!imageFile) {
        throw new Error('No image file provided');
    }

    const storageRef = ref(storage, `products/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl; // Returns the URL of the uploaded image
};

const deleteProduct = async (productId, imageUrl) => {
    console.log("Product ID:", productId);
    try {
        await deleteDoc(doc(db, "products", productId));

        if (imageUrl) {
            // Extract the file path from the download URL
            const matches = imageUrl.match(/products%2F(.*?)\?alt/);
            if (matches) {
                const filePath = `products/${decodeURIComponent(matches[1])}`;
                const imageRef = ref(storage, filePath);
                await deleteObject(imageRef);
            }
        }
    } catch (error) {
        console.error("Error deleting product: ", error);
        throw error;
    }
};



const toggleFeaturedProduct = async (productId, isFeatured) => {
    const productRef = doc(db, "products", productId);
    try {
      await updateDoc(productRef, {
        featured: isFeatured
      });
    } catch (error) {
      console.error("Error updating featured status: ", error);
      throw error;
    }
  };

  const getProductsByCategory = async (categoryName) => {
    const q = query(productsCollectionRef, where("category", "==", categoryName));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export { getProductsByCategory, getProducts, getFeaturedProducts, addProduct, uploadProductImage, toggleFeaturedProduct, deleteProduct };
