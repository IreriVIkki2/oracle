import Home from "../src/components/Home/Home";
import { UserProvider } from "../src/context/UserContext";
import fetch from "isomorphic-unfetch";
import apiUrl from "../utils/apiUrl";

const Index = props => (
    <UserProvider>
        <Home {...props} />
    </UserProvider>
);

Index.getInitialProps = async ({ req }) => {
    const res = await fetch(apiUrl(req, "/api/home/getHome"));
    const home = await res.json();
    return { ...home };
};

export default Index;
