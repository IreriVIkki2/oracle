import TextForm from "./TextForm/TextForm";
import ImageForm from "./ImageForm/ImageForm";
import TextAreaForm from "./TextAreaForm/TextAreaForm";

const FormGroups = props => {
    let formGroup = null;

    switch (props.type) {
        case "text":
            return <TextForm {...props} />;

        case "file":
            return <ImageForm {...props} />;

        case "textarea":
            return <TextAreaForm {...props} />;

        default:
            break;
    }

    return formGroup;
};

export default FormGroups;
