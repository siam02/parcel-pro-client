import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyParcels = () => {
    const { user } = useAuth();
    const { siteName } = useContext(SiteDetailsContext);
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);


    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${user.email}`);
            setLoading(false);
            return res.data;
        }
    })

    if (!loading) {
        console.log(parcels);
    }

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
                        if (res.data.modifiedCount  > 0) {
                            refetch();
                            Swal.fire({
                                title: "Cancelled!",
                                text: "Your booked parcel has been cancelled.",
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
                <title>My Parcels - {siteName}</title>
            </Helmet>
            <div className="md:w-[61vw] xl:w-full sm:w-[90vw] w-[80vw] overflow-x-auto">
                <Table className="min-w-max">
                    <TableCaption>A list of your recent booked parcels.</TableCaption>
                    <TableHeader>
                        <TableRow className="*:text-center">
                            <TableHead>Parcel Type</TableHead>
                            <TableHead>Req. Delivery</TableHead>
                            <TableHead>Approx. Delivery</TableHead>
                            <TableHead>Booking Date</TableHead>
                            <TableHead>Delivery Men ID</TableHead>
                            <TableHead>Booking Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {parcels.map((parcel) => (
                            <TableRow className="*:text-center" key={parcel._id}>
                                <TableCell>{parcel.parcelType}</TableCell>
                                <TableCell>{parcel.reqDeliveryDate}</TableCell>
                                <TableCell>{parcel.approxDeliveryDate || "N/A"}</TableCell>
                                <TableCell>{parcel.bookingDate}</TableCell>
                                <TableCell>{parcel.deliveryManID || "N/A"}</TableCell>
                                <TableCell><Badge variant="outline">{parcel.status}</Badge></TableCell>
                                <TableCell>
                                    <div className="grid grid-cols-2 gap-2 flex-wrap">
                                        <Link to={`${parcel._id}`} className="flex"><Button className="grow">Update</Button></Link>
                                        <Button onClick={() => handleCancel(parcel._id)} variant="destructive" disabled={parcel.status === 'cancelled' || parcel.status != "pending" ? true : false}>{ parcel.status === 'cancelled' ? "Cancelled" : "Cancel"}</Button>
                                        {
                                            parcel.status === 'delivered' && <Button variant="secondary">Review</Button>
                                        }
                                        <Button variant="success" disabled={parcel.status === 'cancelled' ? true : false}>Pay</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    );
};

export default MyParcels;