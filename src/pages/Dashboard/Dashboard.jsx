import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { useContext } from "react";
import { Helmet } from "react-helmet";

const Dashboard = () => {
    const { siteName } = useContext(SiteDetailsContext);
    return (
        <div>
            <Helmet>
                <title>Dashboard - { siteName }</title>
            </Helmet>
        </div>
    );
};

export default Dashboard;