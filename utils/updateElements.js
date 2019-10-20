import { firestore } from "./firebase";

export const updateHomeElement = async (element, data) => {
    // Initialize document
    firestore
        .collection("home")
        .doc(element)
        .update({
            ...data,
        })
        .then(() => {
            console.log("Document updated successfully");
        })
        .catch(err => {
            console.error(err);
        });
};
