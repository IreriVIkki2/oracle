import { useContext } from "react";
import Header from "./Sections/Header";
import { HomeContext } from "../../context/data/HomeContext";
import HomeAbout from "./Sections/About/HomeAbout";

const Home = () => {
    const { home } = useContext(HomeContext);
    if (!home) {
        return <h1>Loading</h1>;
    }

    return (
        <div>
            <Header {...home.header} />
            <HomeAbout {...home.about} />
        </div>
    );
};

export default Home;
