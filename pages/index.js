import Home from "../src/components/Home/Home";
import { UserProvider } from "../src/context/UserContext";

export default () => (
    <UserProvider>
        <Home />
    </UserProvider>
);
