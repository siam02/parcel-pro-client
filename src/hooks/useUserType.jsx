import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUserType = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: userType, isPending: userTypePending } = useQuery({
        queryKey: [user?.email, 'userType'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/type/${user?.email}`);
            return res.data?.type;
        }
    })

    return [userType, userTypePending]
};

export default useUserType;