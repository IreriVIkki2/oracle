import { useContext } from "react";
import { HomeContext } from "../../../Context/HomeContext";
import Header from "./Header/Header";
import About from "./About/About";
import Books from "./Books/Books";
import Involvement from "./Involvement/Involvement";
import Support from "./Support/Support";
import Gallery from "./Gallery/Gallery";

export default () => {
    const { home } = useContext(HomeContext);

    if (!home) {
        return <h1 className="font-weight-lighter">Loading...</h1>;
    }

    return (
        <div>
            <Header {...home.header} />
            <About {...home.about} />
            <Books {...home.books} />
            <Involvement />
            <Support />
            <Gallery />
        </div>
    );
};
