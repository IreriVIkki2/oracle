import { useContext, Fragment } from "react";
import { UserContext } from "../../Context/UserContext";
import Forms from "./Forms";

const Editable = ({ children, elements, section }) => {
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
    console.log("TCL: Editable -> section", section);
    console.log("TCL: Editable -> elements", elements);

    let form = (
        <form action="">
            {Object.keys(elements).map(key => {
                const element = elements[key];
                return <Forms key={key} {...element} />;
            })}
        </form>
    );

    return (
        <Fragment>
            {children}
            <div className="p-2 bg-dark">
                <h3 className="font-weight-lighter">{`Edit ${section} section`}</h3>
                {form}
            </div>
        </Fragment>
    );
};

export default Editable;
