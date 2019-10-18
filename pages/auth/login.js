import Login from "../../src/components/Auth/Login";
import { UserProvider } from "../../src/context/UserContext";

export default () => (
    <UserProvider>
        <Login />
    </UserProvider>
);
