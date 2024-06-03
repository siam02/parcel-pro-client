import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useDeliveryMen = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isDeliveryMan, isPending: isDeliveryManLoading } = useQuery({
        queryKey: [user?.email, 'isDeliveryMan'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/delivery-man/${user.email}`);
            return res.data?.deliveryMan;
        }
    })
    return [isDeliveryMan, isDeliveryManLoading]
};

export default useDeliveryMen;