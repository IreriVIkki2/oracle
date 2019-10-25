import { useState, createContext, useEffect } from "react";
import { getHome } from "../../../utils/firebaseMethods/getElements";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
    const [home, setHome] = useState();

    const updateHomeCollection = async () => {
        setHome(await getHome());
        console.log("[HOME UPDATED]");
    };

    useEffect(() => {
        updateHomeCollection();
        return () => {};
    }, [getHome]);

    return (
        <HomeContext.Provider
            value={{
                home,
                updateHomeCollection,
            }}
        >
            {children}
        </HomeContext.Provider>
    );
};
