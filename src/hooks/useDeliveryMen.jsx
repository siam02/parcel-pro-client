import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useDeliveryMen = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isDeliveryMan, isPending: isDeliveryManLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.deliveryMan;
        }
    })
    return [isDeliveryMan, isDeliveryManLoading]
};

export default useDeliveryMen;