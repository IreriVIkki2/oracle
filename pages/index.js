import { HomeProvider } from "../src/Context/HomeContext";
import Layout from "../src/components/Layout/Layout";
import HomePage from "../src/components/Pages/Homepage/HomePage";

const Index = () => (
    <HomeProvider>
        <Layout>
            <HomePage />
        </Layout>
    </HomeProvider>
);

export default Index;
