import css from "./About.module.css";
import main from "../../../../../main.css";
import Editable from "../../../../Hoc/Editable/Editable";

const About = ({ aboutImage, aboutWriteUp, aboutTitle }) => {
    return (
        <Editable
            section="home about"
            elements={{ aboutImage, aboutTitle, aboutWriteUp }}
        >
            <section className={css.About}>
                <div className={css.ImageOutline}>
                    <div className={css.ImageOutlineImage}>
                        <img
                            className="img-fluid"
                            src={aboutImage.value}
                            alt=""
                        />
                    </div>
                </div>
                <div className={css.AboutWriteUp}>
                    <h1 className={`${main.Bubler} mt-4`}>
                        {aboutTitle.value}
                    </h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: aboutWriteUp.value }}
                    />
                </div>
            </section>
        </Editable>
    );
};

export default About;
