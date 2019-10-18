import { createContext, useState } from "react";
import { auth } from "../../utils/firebase";

export const UserContext = createContext();

export const UserProvider = props => {
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userLoaded, setUserLoaded] = useState(false);

    auth.onAuthStateChanged(user => {
        if (user) {
            setUser(user);
            setIsAuthenticated(!!user);
            setUserLoaded(true);
        }
    });

    return (
        <UserContext.Provider
            value={{
                user,
                isAuthenticated,
                userLoaded,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
