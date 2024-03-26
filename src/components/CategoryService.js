import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const categoriesCollectionRef = collection(db, "categories");

const getCategories = async () => {
    try {
        const data = await getDocs(categoriesCollectionRef);
        return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
        console.error("Error fetching categories: ", error);
        throw error;
    }
};

const getCategoryByName = async (categoryName) => {
    try {
        const q = query(categoriesCollectionRef, where("name", "==", categoryName));
        const data = await getDocs(q);
        return data.docs.map(doc => ({ ...doc.data(), id: doc.id }))[0]; // Assuming name is unique and only one document is returned
    } catch (error) {
        console.error("Error fetching category: ", error);
        throw error;
    }
};


export { getCategories, getCategoryByName };
