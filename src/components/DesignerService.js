import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const designersCollectionRef = collection(db, "designers");

const getAllDesigners = async () => {
    try {
        const data = await getDocs(designersCollectionRef);
        return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
        console.error("Error fetching designers: ", error);
        throw error;
    }
};

const getFeaturedDesigners = async () => {
    try {
        // Example: assuming you have a 'featured' field in your designers' documents
        const q = query(designersCollectionRef, where("featured", "==", true));
        const data = await getDocs(q);
        return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
        console.error("Error fetching featured designers: ", error);
        throw error;
    }
};

const getDesignerByName = async (designerName) => {
    try {
        const q = query(designersCollectionRef, where("name", "==", designerName));
        const data = await getDocs(q);
        return data.docs.map(doc => ({ ...doc.data(), id: doc.id }))[0]; // Assuming 'name' is unique
    } catch (error) {
        console.error("Error fetching designer by name: ", error);
        throw error;
    }
};

// You can add more functions for additional specific designer queries if needed

export { getAllDesigners, getFeaturedDesigners, getDesignerByName };
