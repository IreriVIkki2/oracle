import TextForm from "./Forms/TextForm";

const Forms = props => {
    let formGroup = null;

    switch (props.type) {
        case "text":
            return <TextForm {...props} />;

        case "file":
        // return <ImageForm {...props} />;

        case "textarea":
        // return <TextAreaForm {...props} />;

        default:
            break;
    }

    return formGroup;
};

export default Forms;
