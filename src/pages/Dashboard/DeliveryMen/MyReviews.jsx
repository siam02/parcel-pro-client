import { Helmet } from "react-helmet";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "@/components/ReviewCard";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useUser from "@/hooks/useUser";

const MyReviews = () => {
    const { siteName } = useContext(SiteDetailsContext);
    const axiosSecure = useAxiosSecure();
    const { ID, userDetailsPending } = useUser();

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['reviews'],
        enabled: !userDetailsPending,
        queryFn: async () => {
            const res = await axiosSecure.get(`/delivery-man/reviews/${ID}`);
            return res.data;
        }
    })

    return (
        <div>
            <Helmet>
                <title>My Reviews - {siteName}</title>
            </Helmet>
            <div className="mb-4 flex md:flex-row flex-col md:justify-between justify-center md:text-left text-center items-center">
                <h1 className="text-xl font-bold">My Reviews</h1>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1">
                {
                    isLoading ? <div className="flex justify-center my-10"><span className="loading loading-lg loading-spinner text-primary"></span></div>

                        :

                        <>
                            {
                                reviews.map(review => <ReviewCard key={review._id} review={review} ></ReviewCard>)
                            }
                        </>
                }
            </div>
        </div>
    );
};

export default MyReviews;