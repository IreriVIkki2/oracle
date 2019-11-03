import { useState, useEffect, useContext } from "react";
import updateElement from "../../../../../utils/firebaseMethods/updateElement";
import config from "../../../../../config/config";
import Axios from "axios";
import { HomeContext } from "../../../../Context/HomeContext";

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
            fd.append(`${collection}-${doc}-${path}`, file);
            Axios.post(
                `https://us-central1-nate-a76c4.cloudfunctions.net/uploadFile?bucketName=${config.bucketName}`,
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
        <div className="mx-0 row">
            <label className="h5" htmlFor={path}>
                change {label}
            </label>
            <div className="custom-file col-sm-6 p-0 pr-2">
                <input
                    type="file"
                    className="custom-file-input"
                    id={path}
                    name={label}
                    multiple={false}
                    onChange={handleFileChange}
                />
                <label className="custom-file-label" htmlFor={path}>
                    {label}
                </label>
                <small id="emailHelp" className="form-text text-muted">
                    {saving ? "saving changes" : "changes saved"}
                </small>
            </div>
            <div className="col-sm-6 pt-4" style={{ height: "100px" }}>
                <img
                    className="img-fluid h-100"
                    src={saving ? "/public/uploading.gif" : newImage}
                    alt=""
                />
            </div>
        </div>
    );
};

export default ImageForm;
