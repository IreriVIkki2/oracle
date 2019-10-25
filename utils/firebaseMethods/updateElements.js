import { firestore } from "../firebase";

export const updateElement = async (collection, doc, update) => {
    // Initialize document
    return new Promise((resolve, reject) => {
        firestore
            .collection(collection)
            .doc(doc)
            .update({
                ...update,
            })
            .then(newDoc => {
                resolve({ message: "Update successful", newDoc });
            })
            .catch(err => {
                reject({ message: "Update failure", error: err });
            });
    });
};
