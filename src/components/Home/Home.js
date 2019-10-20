import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Link from "next/link";
import { updateHomeElement } from "../../../utils/updateElements";

const Home = props => {
    const { isAuthenticated } = useContext(UserContext);
    const [tagLine, setTagLine] = useState("");

    return (
        <div>
            <h1>Home page</h1>
            <textarea
                cols="30"
                rows="10"
                onChange={e => setTagLine(e.target.value)}
                value={tagLine}
            />
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                temporibus voluptate nulla molestias officia voluptatem
                excepturi odio consequatur dolor laborum, cumque aperiam ducimus
                doloribus illo quas a veritatis corporis eum!
            </p>
            <button onClick={() => updateHomeElement("header", { tagLine })}>
                Update
            </button>
        </div>
    );
};

export default Home;
