import { useState, useEffect, useContext } from "react";
import { updateElement } from "../../../../utils/firebaseMethods/updateElements";
import { HomeContext } from "../../../context/data/HomeContext";

const TextForm = ({ doc, collection, label, value, path }) => {
    const [newValue, setNewValue] = useState(value);
    const [changes, setChanges] = useState(0);
    const [saving, setSaving] = useState(false);
    const { updateHomeCollection } = useContext(HomeContext);

    const handleInputChange = e => {
        setNewValue(e.target.value);
        setChanges(changes + 1);
        setSaving(true);
    };

    const handleElementUpdate = async () => {
        const update = {};
        const newText = document.getElementById("text").value;
        if (newText === value) {
            setSaving(false);
            return;
        }

        update[path] = newText;
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

    useEffect(() => {
        return () => {
            handleElementUpdate();
        };
    }, []);

    useEffect(() => {
        if (changes > 5) {
            setChanges(0);
            handleElementUpdate();
        }
    }, [changes, setChanges]);

    return (
        <div className="form-group">
            <label htmlFor="text">{label}</label>
            <input
                type="text"
                className="form-control"
                id="text"
                placeholder={`Edit ${label}`}
                value={newValue}
                onChange={handleInputChange}
                onBlur={handleElementUpdate}
            />
            <small id="emailHelp" className="form-text text-muted">
                {saving ? "saving changes" : "changes saved"}
            </small>
        </div>
    );
};

export default TextForm;
