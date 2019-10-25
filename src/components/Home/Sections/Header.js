import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import EditableComponent from "../../../hoc/EditableComponent";
import css from "./Header.module.css";

const Header = ({ tagLine, backgroundImage }) => {
    const { toggleEditing } = useContext(UserContext);
    let card = !toggleEditing ? "h-100" : "";

    return (
        <EditableComponent
            elements={{ tagLine, backgroundImage }}
            section="Header"
        >
            <section className={card}>
                <div
                    className={css.Header}
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
