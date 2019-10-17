import { useEffect, useState } from "react";

const Home = () => {
    const [Value, setValue] = useState("");

    const submit = () => {
        console.log("TCL: Home -> Value", Value);
    };

    return (
        <div>
            <h1>Home page</h1>
            <small>testing inputs</small>
            <br />
            <br />
            <hr />
            <input
                type="text"
                onChange={e => setValue(e.target.value)}
                value={Value}
            />
            <br />
            <br />
            <button onClick={submit}>Submit</button>
        </div>
    );
};

export default Home;
