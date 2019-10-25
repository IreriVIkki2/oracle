import { useContext } from "react";
import EditableComponent from "../../../hoc/EditableComponent";
import { HomeContext } from "../../../context/data/HomeContext";
import { UserContext } from "../../../context/UserContext";

const Header = props => {
    const landingBackground = "";
    const { home } = useContext(HomeContext);
    const { toggleEditing } = useContext(UserContext);

    if (!home) {
        return <h1>Loading</h1>;
    }

    let card = !toggleEditing
        ? "m-2 border border-info rounded shadow p-2"
        : "p-2";

    const { tagLine, backgroundImage } = home.header;
    console.log(home.header);

    return (
        <EditableComponent elements={home.header} section="Header">
            <section>
                <div
                    className={card}
                    style={{
                        backgroundImage: `url("${backgroundImage.value}")`,
                    }}
                >
                    <h1>{tagLine.value}</h1>
                    <ul className="row list-unstyled mx-0">
                        <li className="p-1">
                            <p>item 1</p>
                        </li>
                        <li className="p-1">
                            <p>item 2</p>
                        </li>
                        <li className="p-1">
                            <p>item 3</p>
                        </li>
                    </ul>
                </div>
            </section>
        </EditableComponent>
    );
};

export default Header;
