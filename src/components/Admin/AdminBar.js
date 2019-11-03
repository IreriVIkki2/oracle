import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { auth } from "firebase";

const AdminBar = () => {
    const { isAuthenticated, toggleEditing, setToggleEditing } = useContext(
        UserContext,
    );

    if (!isAuthenticated) {
        return null;
    }

    const handleLogOut = () => {
        auth()
            .signOut()
            .then(() => {
                console.log("Logout Successful");
            })
            .catch(error => {
                console.error(error);
                throw error;
            });
    };

    const handleToggleEditMode = () => setToggleEditing(!toggleEditing);

    return (
        <div
            className="bg-dark py-1 px-3 position-fixed top-0 w-100"
            style={{ height: "40px", zIndex: "900" }}
        >
            <div className="d-flex align-items-center">
                <button
                    className="mr-2 btn-sm px-3 btn-warning"
                    onClick={handleToggleEditMode}
                >
                    {toggleEditing ? "View as guest" : "view as admin"}
                </button>
                <button
                    className="mr-2 btn-sm px-3 btn-danger"
                    onClick={handleLogOut}
                >
                    LogOut
                </button>
            </div>
        </div>
    );
};

export default AdminBar;
