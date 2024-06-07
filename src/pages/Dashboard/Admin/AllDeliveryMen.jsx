import { Helmet } from "react-helmet";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"




const AllDeliveryMen = () => {
    const { siteName } = useContext(SiteDetailsContext);
    const [deliveryCounts, setDeliveryCounts] = useState({});

    const axiosSecure = useAxiosSecure();

    const { data: deliveryMen = [], isLoading } = useQuery({
        queryKey: ['deliveryMen'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/delivery-men`);
            const men = res.data;
            men.map(man => deliveryCount(man._id));
            return res.data;
        }
    })


    const deliveryCount = (id) => {

        axiosSecure.get(`/delivery-man-delivered-count/${id}`)
            .then(({ data }) => {
                setDeliveryCounts(prevCounts => ({
                    ...prevCounts,
                    [id]: data.count,
                }));
            })
            .catch(error => console.error('Error fetching delivery count:', error));

    }

    return (
        <div>
            <Helmet>
                <title>All Delivery Men - {siteName}</title>
            </Helmet>
            <div className="mb-4 gap-4 flex lg:flex-row flex-col md:justify-between justify-center md:text-left text-center items-center">
                <h1 className="text-xl font-bold">All Delivery Men</h1>
            </div>

            <div className="md:w-[61vw] xl:w-full sm:w-[90vw] w-[80vw] overflow-x-auto">
                {
                    isLoading ?
                        <div className="flex justify-center my-10"><span className="loading loading-lg loading-spinner text-primary"></span></div>
                        :
                        <Table className="min-w-max">
                            <TableCaption>A list of your recent booked parcels.</TableCaption>
                            <TableHeader>
                                <TableRow className="*:text-center">
                                    <TableHead>Delivery Man&apos;s Name</TableHead>
                                    <TableHead>Phone Number</TableHead>
                                    <TableHead>Number of parcel delivered</TableHead>
                                    <TableHead>Average review</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {deliveryMen.map((man) => (
                                    <TableRow className="*:text-center" key={man._id}>
                                        <TableCell>{man.name}</TableCell>
                                        <TableCell>{man.phoneNumber}</TableCell>
                                        <TableCell>{deliveryCounts[man._id] !== undefined ? deliveryCounts[man._id] : <span className="loading loading-xs loading-spinner text-primary"></span>}</TableCell>
                                        <TableCell>{man.reqDeliveryDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                }
            </div>
        </div>
    );
};

export default AllDeliveryMen;