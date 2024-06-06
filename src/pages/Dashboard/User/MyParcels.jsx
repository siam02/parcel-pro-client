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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyParcels = () => {
    const { user } = useAuth();
    const { siteName } = useContext(SiteDetailsContext);
    const axiosSecure = useAxiosSecure();
    const [showParcels, setShowParcels] = useState([]);
    const [filtered, setFiltered] = useState(false);


    const { data: parcels = [], refetch, isLoading } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels-by-email/${user.email}`);
            setShowParcels(res.data);
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
                                text: "Your booked parcel has been cancelled.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleFilter = (filter) => {
        const newParcels = parcels.filter(parcel => parcel.status === filter);
        setShowParcels(newParcels);
        setFiltered(true);
    }

    const resetFilter = () => {
        setFiltered(false);
        refetch();
    }


    return (
        <div>
            <Helmet>
                <title>My Parcels - {siteName}</title>
            </Helmet>
            <div className="mb-4 flex md:flex-row flex-col md:justify-between justify-center md:text-left text-center items-center">
                <h1 className="text-xl font-bold">My Parcels</h1>
                <div className="flex flex-col gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="outline">Filter by Status</Button></DropdownMenuTrigger>
                        <DropdownMenuContent className="*:cursor-pointer">
                            <DropdownMenuItem onClick={() => handleFilter("pending")}>Pending</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFilter("On The Way")}>On the Way</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFilter("delivered")}>Delivered</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFilter("returned")}>Returned</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleFilter("cancelled")}>Cancelled</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {
                        filtered && <Button onClick={resetFilter}>Reset Filter</Button>
                    }
                </div>
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
                                {showParcels.map((parcel) => (
                                    <TableRow className="*:text-center" key={parcel._id}>
                                        <TableCell>{parcel.parcelType}</TableCell>
                                        <TableCell>{parcel.reqDeliveryDate}</TableCell>
                                        <TableCell>{parcel.approxDeliveryDate || "N/A"}</TableCell>
                                        <TableCell>{parcel.bookingDate}</TableCell>
                                        <TableCell>{parcel.deliveryManID || "N/A"}</TableCell>
                                        <TableCell><Badge variant={parcel.status === "cancelled" ? "destructive" : "outline"}>{parcel.status}</Badge></TableCell>
                                        <TableCell>
                                            <div className="grid grid-cols-2 gap-2 flex-wrap">
                                                {
                                                    parcel.status === "pending" && <Link to={`${parcel._id}`} className="flex"><Button className="grow">Update</Button></Link>
                                                }
                                                <Button onClick={() => handleCancel(parcel._id)} variant="destructive" disabled={parcel.status === 'cancelled' || parcel.status != "pending" ? true : false}>{parcel.status === 'cancelled' ? "Cancelled" : "Cancel"}</Button>
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
                }
            </div>

        </div>
    );
};

export default MyParcels;