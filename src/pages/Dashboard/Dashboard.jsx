import { AuthContext } from "@/providers/AuthProvider";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { useContext } from "react";
import { Helmet } from "react-helmet";

const Dashboard = () => {
    const { siteName } = useContext(SiteDetailsContext);
    const {user} = useContext(AuthContext);
    return (
        <div>
            <Helmet>
                <title>Dashboard - { siteName }</title>
            </Helmet>
            <div className="text-xl font-bold">
                Welcome, { user.displayName }
            </div>
        </div>
    );
};

export default Dashboard;