import { useState, useContext, useEffect } from "react";
import { auth } from "../../../utils/firebase";
import { useRouter } from "next/router";
import { UserContext } from "../../Context/UserContext";

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
            <div className="container">
                <div className="card mt-5">
                    <h1 className="card-header">Login</h1>
                    <div className="card-body d-flex flex-column">
                        <input
                            className="my-3 form-control rounded-0"
                            type="email"
                            placeholder="email"
                            onChange={e => setEmail(e.target.value)}
                            value={Email}
                        />
                        <input
                            className="my-3 form-control rounded-0"
                            type="password"
                            placeholder="password"
                            onChange={e => setPassword(e.target.value)}
                            value={Password}
                        />
                    </div>

                    <div className="card-footer">
                        <button
                            className="btn-sm px-3 btn-info"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return renderContent;
};

export default Login;
