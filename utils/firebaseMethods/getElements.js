import { firestore } from "../firebase";

export const getHome = () => {
    return new Promise((resolve, reject) => {
        firestore
            .collection("home")
            .get()
            .then(snapshot => {
                const home = {};
                snapshot.docs.forEach(doc => {
                    home[doc.id] = doc.data();
                });
                resolve(home);
            })
            .catch(err => reject(err));
    });
};
