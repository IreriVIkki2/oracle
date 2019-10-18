import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import Link from "next/link";

const Home = props => {
    const { isAuthenticated } = useContext(UserContext);
    console.log("TCL: user", isAuthenticated);
    return (
        <div>
            <h1>Home page</h1>
            <Link href="/auth/login">
                <a>Login</a>
            </Link>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                temporibus voluptate nulla molestias officia voluptatem
                excepturi odio consequatur dolor laborum, cumque aperiam ducimus
                doloribus illo quas a veritatis corporis eum!
            </p>
        </div>
    );
};

export default Home;
