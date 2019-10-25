import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import { auth } from "firebase";

const Layout = ({ children }) => {
    const router = useRouter();
    const { isAuthenticated, toggleEditing, setToggleEditing } = useContext(
        UserContext,
    );

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

    const handleLogIn = () => router.replace("/auth/login");

    const handleToggleEditMode = () => setToggleEditing(!toggleEditing);

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <button onClick={handleToggleEditMode}>
                        Toggle Edit Mode
                    </button>
                    <button onClick={handleLogOut}>Logout</button>
                </div>
            ) : (
                <button onClick={handleLogIn}>Login</button>
            )}
            {children}
        </div>
    );
};

export default Layout;
