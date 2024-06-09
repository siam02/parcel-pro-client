import { Helmet } from "react-helmet";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import withReactContent from 'sweetalert2-react-content';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";



const AllParcels = () => {
    const { siteName } = useContext(SiteDetailsContext);
    const MySwal = withReactContent(Swal);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch, isLoading } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?startDate=${startDate}&endDate=${endDate}`);
            return res.data;
        }
    })

    const { data: deliveryMen = [] } = useQuery({
        queryKey: ['deliveryMen'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/delivery-men`);
            return res.data;
        }
    })

    const handleManage = (parcel) => {
        MySwal.fire({
            title: 'Manage Parcel',
            html: (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 items-center">
                        <Label>Select Delivery Man:</Label>
                        <select id="deliveryManSelect" className="border h-9 rounded-md text-base py-1 px-3">
                            {deliveryMen.map(man => (
                                <option key={man._id} value={man._id}>{man.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                        <Label>Approx. Delivery Date:</Label>
                        <Input
                            type="date"
                            id="deliveryDateInput"
                        />
                    </div>
                </div>
            ),
            showCancelButton: true,
            confirmButtonText: 'Assign',
            preConfirm: () => {
                const deliveryManID = document.getElementById('deliveryManSelect').value;
                const approxDeliveryDate = document.getElementById('deliveryDateInput').value;
                if (!deliveryManID || !approxDeliveryDate) {
                    MySwal.showValidationMessage('Please select a delivery man and a delivery date.');
                    return false;
                }
                return { deliveryManID, approxDeliveryDate };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { deliveryManID, approxDeliveryDate } = result.value;
                const updatedParcel = { deliveryManID, approxDeliveryDate }
                axiosSecure.patch(`/parcels/update-admin/${parcel._id}`, updatedParcel)
                    .then(({ data }) => {
                        if (data.modifiedCount > 0) {
                            MySwal.fire('Success', 'Parcel assigned successfully!', 'success');
                            refetch();
                        } else {
                            MySwal.fire('Error', 'Failed to assign parcel.', 'error');
                        }
                    })
                    .catch(error => {
                        console.error('Error assigning parcel:', error);
                        MySwal.fire('Error', 'Failed to assign parcel.', 'error');
                    });
            }
        });
    };

    const handleSearch = () => {
        refetch();
    }



    return (
        <div>
            <Helmet>
                <title>All Parcels - {siteName}</title>
            </Helmet>
            <div className="mb-4 gap-4 flex lg:flex-row flex-col md:justify-between justify-center md:text-left text-center items-center">
                <h1 className="text-xl font-bold">All Parcels</h1>
                <div className="flex lg:flex-row flex-col gap-4 items-center">
                    <div className="flex gap-3 items-center">
                        <Label className="text-nowrap">Start Date:</Label>
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3 items-center">
                        <Label className="text-nowrap">End Date:</Label>
                        <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <Button variant="secondary" onClick={handleSearch}>Search</Button>
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
                                    <TableHead>User&apos;s Name</TableHead>
                                    <TableHead>User’s Phone</TableHead>
                                    <TableHead>Booking Date</TableHead>
                                    <TableHead>Requested Delivery Date</TableHead>
                                    <TableHead>Cost</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {parcels.map((parcel) => (
                                    <TableRow className="*:text-center" key={parcel._id}>
                                        <TableCell>{parcel.name}</TableCell>
                                        <TableCell>{parcel.phoneNumber}</TableCell>
                                        <TableCell>{parcel.bookingDate}</TableCell>
                                        <TableCell>{parcel.reqDeliveryDate}</TableCell>
                                        <TableCell>{parcel.price}</TableCell>
                                        <TableCell><Badge variant={parcel.status === "cancelled" ? "destructive" : parcel.status === "delivered" ? "success" : "outline"}>{parcel.status}</Badge></TableCell>
                                        <TableCell>
                                            <Button  disabled={parcel.status === "cancelled" ? true : false } onClick={() => handleManage(parcel)}>Manage</Button>
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

export default AllParcels;