import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserType from "@/hooks/useUserType";


const DashboardRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [userType, userTypePending] = useUserType();
    const location = useLocation();

    if (loading || userTypePending) {
        return <div className="flex justify-center my-10"><span className="loading loading-lg loading-spinner text-primary"></span></div>
    }

    if (user && userType) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default DashboardRoute;