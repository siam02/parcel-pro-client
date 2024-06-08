import useUserType from "@/hooks/useUserType";
import { AuthContext } from "@/providers/AuthProvider";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const { siteName } = useContext(SiteDetailsContext);
    const {user} = useContext(AuthContext);
    const [userType, userTypePending] = useUserType();

    if (userTypePending) {
        return <div className="flex justify-center my-10"><span className="loading loading-lg loading-spinner text-primary"></span></div>
    }

    if (userType === "Admin") {
        return <Navigate to="statistics"></Navigate>
    }

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