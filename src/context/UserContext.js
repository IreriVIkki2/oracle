import { createContext, useState } from "react";
import { auth } from "../../utils/firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [userLoaded, setUserLoaded] = useState();
    const [toggleEditing, setToggleEditing] = useState(true);

    auth.onAuthStateChanged(user => {
        if (user) {
            setUser(user);
            setIsAuthenticated(!!user);
            setUserLoaded(true);
        } else {
            setUser(null);
            setUserLoaded(true);
            setIsAuthenticated(false);
        }
    });

    return (
        <UserContext.Provider
            value={{
                user,
                isAuthenticated,
                userLoaded,
                toggleEditing,
                setToggleEditing,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
