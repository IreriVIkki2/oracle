import TextForm from "./TextForm/TextForm";
import ImageForm from "./ImageForm/ImageForm";

const FormGroups = props => {
    let formGroup = null;

    switch (props.type) {
        case "text":
            return <TextForm {...props} />;

        case "file":
            return <ImageForm {...props} />;

        default:
            break;
    }

    return formGroup;
};

export default FormGroups;
