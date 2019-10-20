import { firestore } from "../../../utils/firebase";

export default async (req, res) => {
    firestore
        .collection("home")
        .get()
        .then(snapshot => {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(
                JSON.stringify({
                    ...snapshot.docs[0].data(),
                }),
            );
        });
};
