import { useState, useEffect, useContext } from "react";
import { updateElement } from "../../../../utils/firebaseMethods/updateElements";
import { HomeContext } from "../../../context/data/HomeContext";
import Axios from "axios";
import config from "../../../../config";

const ImageForm = ({ doc, collection, label, value, path }) => {
    const [saving, setSaving] = useState(false);
    const [newImage, setNewImage] = useState(value);
    const { updateHomeCollection } = useContext(HomeContext);

    useEffect(() => {
        handleElementUpdate();
    }, [newImage]);

    const handleFileChange = e => {
        const file = e.target.files[0];
        if (file) {
            setSaving(true);
            const fd = new FormData();
            fd.append("home-header-backgroundImage", file);
            Axios.post(
                `https://us-central1-functions-c9cb3.cloudfunctions.net/uploadFile?bucketName=${config.bucketName}`,
                fd,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            )
                .then(res => {
                    setNewImage(res.data.metadata.mediaLink);
                })
                .catch(err => console.error(err));
        }
    };

    const handleElementUpdate = async () => {
        const update = {};
        if (newImage === value) {
            setSaving(false);
            return;
        }

        update[path] = newImage;
        await updateElement(collection, doc, update)
            .then(() => {
                switch (collection) {
                    case "home":
                        updateHomeCollection();
                        break;

                    default:
                        break;
                }
            })
            .catch(err => {
                throw err;
            });
        setSaving(false);
    };

    return (
        <div className="d-flex">
            <div className="w-25 mr-2">
                <img
                    className="img-fluid"
                    src={saving ? "/public/uploading.gif" : newImage}
                    alt=""
                />
            </div>
            <div className="form-group">
                <label htmlFor="file">{label}</label>

                <input
                    type="file"
                    className="form-control"
                    id="file"
                    multiple={false}
                    onChange={handleFileChange}
                />
                <small id="emailHelp" className="form-text text-muted">
                    {saving ? "saving changes" : "changes saved"}
                </small>
            </div>
        </div>
    );
};

export default ImageForm;
