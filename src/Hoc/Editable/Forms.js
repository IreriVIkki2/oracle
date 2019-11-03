import TextForm from "./Forms/TextForm";
import Wysiwyg from "./Forms/Wysiwyg/Wysiwyg";
import ImageForm from "./Forms/ImageForm/ImageForm";

const Forms = props => {
    let formGroup = null;

    switch (props.type) {
        case "file":
            return <ImageForm {...props} />;

        case "wysiwyg":
            return <Wysiwyg {...props} />;

        case "text":
            return <TextForm {...props} />;

        default:
            break;
    }

    return formGroup;
};

export default Forms;
