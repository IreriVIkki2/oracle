import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import EditableComponent from "../../../../hoc/EditableComponent";

const HomeAbout = ({ aboutImage, aboutWriteUp }) => {
    const { toggleEditing } = useContext(UserContext);
    let card = !toggleEditing ? "h-100" : "";

    return (
        <EditableComponent
            elements={{ aboutImage, aboutWriteUp }}
            section="About Natasha"
        >
            <section className={card}>
                <div className="d-flex align-items-center">
                    <div className="w-50 p-2">
                        <img
                            src={aboutImage.value}
                            alt=""
                            className="img-fluid"
                        />
                    </div>
                    <div className="w-50 p-2">
                        <p>{aboutWriteUp.value}</p>
                    </div>
                </div>
            </section>
        </EditableComponent>
    );
};

export default HomeAbout;
