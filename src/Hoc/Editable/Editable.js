import { useContext, Fragment, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import Forms from "./Forms";

const Editable = ({ children, elements, section }) => {
    const { isAuthenticated, toggleEditing } = useContext(UserContext);
    const [isHidden, setIsHidden] = useState(true);

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
                return (
                    <div className="mt-3" key={key}>
                        <Forms {...element} />
                    </div>
                );
            })}
        </form>
    );

    return (
        <Fragment>
            <div className="border border-info mb-5">
                {children}
                <div
                    className="px-2 py-2 pb-4"
                    style={{ backgroundColor: "#fdebd3" }}
                >
                    <button
                        onClick={() => setIsHidden(!isHidden)}
                        className="badge-pill btn btn-outline-info px-4 py-1 mb-2"
                    >
                        {isHidden ? "show editor" : "hide editor"}
                    </button>
                    <div hidden={isHidden}>{form}</div>
                </div>
            </div>
        </Fragment>
    );
};

export default Editable;
