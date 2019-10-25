import { useState, useContext, useEffect } from "react";
import { auth } from "../../../utils/firebase";
import { useRouter } from "next/router";
import { UserContext } from "../../context/UserContext";

const Login = () => {
    const { isAuthenticated, userLoaded } = useContext(UserContext);
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (userLoaded && isAuthenticated) router.replace("/");
    }, [isAuthenticated, userLoaded]);

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(Email, Password).catch(error => {
            throw (error.code, error.message);
        });
    };

    let renderContent = null;

    if (!userLoaded) {
        renderContent = <h1>Loading...</h1>;
    } else if (userLoaded && !isAuthenticated) {
        renderContent = (
            <div>
                <h1 className="">Login</h1>
                <hr />
                <br />
                <input
                    className=""
                    type="email"
                    placeholder="email"
                    onChange={e => setEmail(e.target.value)}
                    value={Email}
                />
                <br />
                <br />
                <input
                    className=""
                    type="password"
                    placeholder="password"
                    onChange={e => setPassword(e.target.value)}
                    value={Password}
                />
                <br />
                <br />

                <button className="" onClick={handleLogin}>
                    Login
                </button>
            </div>
        );
    }

    return renderContent;
};

export default Login;
