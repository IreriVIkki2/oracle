import css from "./Header.module.css";
import Editable from "../../../../Hoc/Editable/Editable";

export default ({ backgroundImage, tagLine }) => {
    return (
        <Editable elements={{ backgroundImage, tagLine }} section="Header">
            <div
                className={css.Header}
                style={{
                    backgroundImage: `url("${backgroundImage.value}")`,
                }}
            >
                <div className={`${css.Content} container`}>
                    <h5>Empowering My</h5>
                    <h1>NEXT GENERATION</h1>
                    <h5>By Preaching The</h5>
                    <h1>UNDILUTED GOSPEL</h1>
                </div>
            </div>
        </Editable>
    );
};
