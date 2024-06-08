import useAxiosSecure from "@/hooks/useAxiosSecure";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import useUser from "@/hooks/useUser";

const MyDeliveryList = () => {
    const { siteName } = useContext(SiteDetailsContext);
    const axiosSecure = useAxiosSecure();
    const { userDetailsPending, ID } = useUser();


    const { data: parcels = [], refetch, isLoading } = useQuery({
        queryKey: ['parcels'],
        enabled: !userDetailsPending,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/delivery-man/${ID}`);
            return res.data;
        }
    })

    const handleCancel = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/parcels/cancel/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Cancelled!",
                                text: "The parcel delivery has been cancelled.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleDeivery = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to make this parcel delivered?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/parcels/delivery/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Delivered!",
                                text: "The parcel is succesfully marked as delivered.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    return (
        <div>
            <Helmet>
                <title>My Delivery List - {siteName}</title>
            </Helmet>
            <div className="mb-4 flex md:flex-row flex-col md:justify-between justify-center md:text-left text-center items-center">
                <h1 className="text-xl font-bold">My Delivery List</h1>
            </div>
            <div className="md:w-[61vw] xl:w-[46vw] sm:w-[90vw] w-[80vw] overflow-x-auto">
                {
                    isLoading ?
                        <div className="flex justify-center my-10"><span className="loading loading-lg loading-spinner text-primary"></span></div>
                        :
                        <Table className="min-w-max">
                            <TableHeader>
                                <TableRow className="*:text-center">
                                    <TableHead>Booked User’s Name</TableHead>
                                    <TableHead>Receiver’s Name</TableHead>
                                    <TableHead>Booked User’s Phone</TableHead>
                                    <TableHead>Requested Delivery Date</TableHead>
                                    <TableHead>Approximate Delivery Date</TableHead>
                                    <TableHead>Recievers phone number</TableHead>
                                    <TableHead>Receivers Address</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {parcels.map((parcel) => (
                                    <TableRow className="*:text-center" key={parcel._id}>
                                        <TableCell>{parcel.name}</TableCell>
                                        <TableCell>{parcel.receiverName}</TableCell>
                                        <TableCell>{parcel.phoneNumber}</TableCell>
                                        <TableCell>{parcel.reqDeliveryDate}</TableCell>
                                        <TableCell>{parcel.approxDeliveryDate}</TableCell>
                                        <TableCell>{parcel.receiverPhone}</TableCell>
                                        <TableCell>{parcel.deliveryAddress}</TableCell>
                                        <TableCell><Button>View Location</Button></TableCell>
                                        <TableCell>
                                            <div className="grid grid-cols-2 gap-2 flex-wrap">
                                                <Button onClick={() => handleCancel(parcel._id)} disabled={parcel.status === "cancelled" || parcel.status === "delivered" ? true : false } variant="destructive">{parcel.status === 'cancelled' ? "Cancelled" : "Cancel"}</Button>
                                                <Button onClick={() => handleDeivery(parcel._id)} variant="success" disabled={parcel.status === 'cancelled' || parcel.status === "delivered" ? true : false}>{ parcel.status === "delivered" ? 'Delivered' : 'Deliver'}</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                }
            </div>

        </div>
    );
};

export default MyDeliveryList;