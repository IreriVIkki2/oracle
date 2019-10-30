import { useState, useContext } from "react";
import Toolbar from "../Navigation/Toolbar";
import Sidebar from "../Navigation/Sidebar/Sidebar";
import { UserContext } from "../../Context/UserContext";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
    const [sidebar, setSidebar] = useState(false);
    const { isAuthenticated } = useContext(UserContext);

    return (
        <div style={{ minHeight: "100vh" }}>
            {isAuthenticated ? <div style={{ paddingBottom: "40px" }} /> : null}
            <Toolbar showSidebar={() => setSidebar(true)} />
            <div style={{ paddingBottom: "65px" }}></div>
            {sidebar ? (
                <Sidebar
                    closeSidebar={() => setSidebar(false)}
                    sidebar={sidebar}
                />
            ) : null}
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
