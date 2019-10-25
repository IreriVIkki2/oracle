import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import FormGroups from "../containers/FormGroups/FormGroups";

const EditableComponent = ({ children, elements, section }) => {
    const { isAuthenticated, toggleEditing } = useContext(UserContext);

    if (!isAuthenticated || !toggleEditing) {
        return children;
    }

    if (!section || !elements) {
        return (
            <div className="alert alert-warning">
                <p>section and elements are required</p>
            </div>
        );
    }

    let form = (
        <form action="">
            {Object.keys(elements).map(key => {
                const element = elements[key];
                return <FormGroups key={key} {...element} />;
            })}
        </form>
    );

    return (
        <div className="m-2 border border-info rounded shadow">
            {children}
            <div className="mt-2 p-2 bg-info">
                <h3>{`Edit ${section} section`}</h3>
                {form}
            </div>
        </div>
    );
};

export default EditableComponent;
