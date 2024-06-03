import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useDeliveryMen from "@/hooks/useDeliveryMen";


const DeliveryMenRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isDeliveryMan, isDeliveryManLoading] = useDeliveryMen();
    const location = useLocation();

    if (loading || isDeliveryManLoading) {
        return <div className="flex justify-center my-10"><span className="loading loading-lg loading-spinner text-primary"></span></div>
    }

    if (user && isDeliveryMan) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default DeliveryMenRoute;