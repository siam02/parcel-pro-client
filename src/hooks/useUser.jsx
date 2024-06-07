import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

 

    const { data: userDetails, isPending: userDetailsPending } = useQuery({
        queryKey: ['userDetails'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-by-email/${user.email}`);
            return res.data;
        }
    })

    if (userDetailsPending) {
        return {userDetailsPending}
    }


    const name = userDetails.name;
    const photo = userDetails.photo;
    const type = userDetails.type;
    const ID = userDetails._id;
    const email = userDetails.email;
    const phoneNumber = userDetails.phoneNumber;
    

    return { type, name, photo, email, ID, phoneNumber, userDetailsPending };
};

export default useUser;