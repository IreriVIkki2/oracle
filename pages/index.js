import Home from "../src/components/Home/Home";
import Layout from "../src/components/Layout/Layout";
import { HomeProvider } from "../src/context/data/HomeContext";

const Index = props => (
    <HomeProvider>
        <Layout>
            <Home {...props} />
        </Layout>
    </HomeProvider>
);

export default Index;
