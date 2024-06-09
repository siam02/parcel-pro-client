import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea"

import {
    Table,
    TableBody,
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
import withReactContent from "sweetalert2-react-content";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Rating from "react-rating";

const MyParcels = () => {
    const { user } = useAuth();
    const { siteName } = useContext(SiteDetailsContext);
    const axiosSecure = useAxiosSecure();
    const [showParcels, setShowParcels] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const MySwal = withReactContent(Swal);


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

    const handleReview = (parcel) => {
        let ratingValue = 0;
        MySwal.fire({
            title: 'Review',
            html: (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 items-center">
                        <Label>User’s Name:</Label>
                        <Input
                            type="text"
                            id="userName"
                            value={user.displayName}
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <Label>User’s Image:</Label>
                        <Input
                            type="text"
                            id="userImage"
                            value={user.photoURL}
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <Label>Rating:</Label>
                        <Rating
                            emptySymbol={<FaRegStar />}
                            fullSymbol={<FaStar />}
                            onChange={(value) => ratingValue = value}
                        />
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <Label>Feedback:</Label>
                        <Textarea id="feedback" />
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <Label>Approx. Delivery Date:</Label>
                        <Input
                            type="text"
                            id="deliveryManID"
                            value={parcel.deliveryManID}
                        />
                    </div>
                </div>
            ),
            showCancelButton: true,
            confirmButtonText: 'Review',
            preConfirm: () => {
                const userName = document.getElementById('userName').value;
                const userImage = document.getElementById('userImage').value;
                const feedback = document.getElementById('feedback').value;
                const deliveryManID = document.getElementById('deliveryManID').value;
                const reviewDate = new Date().toISOString().slice(0, 10);


                console.log(userName, userImage, ratingValue, feedback, deliveryManID);

                if (!userName || !userImage || !ratingValue || !feedback || !deliveryManID) {
                    MySwal.showValidationMessage('Please fillup all fields');
                    return false;
                }
                return { userName, userImage, rating: ratingValue, reviewDate, feedback, deliveryManID };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { userName, userImage, rating, reviewDate, feedback, deliveryManID } = result.value;
                const review = { userName, userImage, rating, reviewDate, feedback, deliveryManID }
                axiosSecure.post(`/delivery-man/review`, review)
                    .then(({ data }) => {
                        if (data.insertedId) {
                            MySwal.fire('Success', 'Review successfully Submitted!', 'success');
                            refetch();
                        } else {
                            MySwal.fire('Error', 'Something went wrong.', 'error');
                        }
                    })
                    .catch(error => {
                        console.error('Error reviewing:', error);
                        MySwal.fire('Error', 'Something went wrong.', 'error');
                    });
            }
        });
    };


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
                                        <TableCell><Badge variant={parcel.status === "cancelled" ? "destructive" : parcel.status === "delivered" ? "success" : "outline"}>{parcel.status}</Badge></TableCell>
                                        <TableCell>
                                            <div className="grid grid-cols-2 gap-2 flex-wrap">
                                                {
                                                    parcel.status === "pending" && <Link to={`${parcel._id}`} className="flex"><Button className="grow">Update</Button></Link>
                                                }
                                                <Button onClick={() => handleCancel(parcel._id)} variant="destructive" disabled={parcel.status === 'cancelled' || parcel.status != "pending" ? true : false}>{parcel.status === 'cancelled' ? "Cancelled" : "Cancel"}</Button>
                                                {
                                                    parcel.status === 'delivered' && <Button onClick={() => handleReview(parcel)} variant="secondary">Review</Button>
                                                }
                                                {
                                                    parcel.status === 'cancelled' || <Link to={parcel.paymentStatus === "Paid" ? "" : `/dashboard/payment/${parcel._id}`} className="flex"><Button className="grow" disabled={parcel.paymentStatus === "Paid" ? true : false} variant="success">{ parcel.paymentStatus === "Paid" ? "Paid" : "Pay" }</Button></Link>
                                                }
                                                
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