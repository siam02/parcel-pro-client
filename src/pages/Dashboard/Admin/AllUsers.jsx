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
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"




const AllUsers = () => {
    const { siteName } = useContext(SiteDetailsContext);
    const [bookingCounts, setBookingCounts] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    const axiosSecure = useAxiosSecure();

    const { data: count = 0, } = useQuery({
        queryKey: ['count'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userCount`);
            return res.data?.count;
        }
    })

    const numberOfPages = Math.ceil(count / 5);

    const pages = [...Array(numberOfPages).keys()];

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${currentPage}&size=5`);
            const men = res.data;
            men.map(man => bookingCount(man.email));
            return res.data;
        }
    })

    const bookingCount = (email) => {

        axiosSecure.get(`/user-booking-count/${email}`)
            .then(({ data }) => {
                setBookingCounts(prevCounts => ({
                    ...prevCounts,
                    [email]: data.count,
                }));
            })
            .catch(error => console.error('Error fetching user booking count:', error));

    }

    const handleChangeType = (id, type) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Are you really want to change this user type to ${type}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/type/${id}?type=${type}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Updated!",
                                text: "The user type successfully updated",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
            
        }
    }

    return (
        <div>
            <Helmet>
                <title>All Users - {siteName}</title>
            </Helmet>
            <div className="mb-4 gap-4 flex lg:flex-row flex-col md:justify-between justify-center md:text-left text-center items-center">
                <h1 className="text-xl font-bold">All Users</h1>
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
                                    <TableHead>User&apos;s Name</TableHead>
                                    <TableHead>Phone Number</TableHead>
                                    <TableHead>Number of parcel booked</TableHead>
                                    <TableHead>Delivery Man</TableHead>
                                    <TableHead>Admin</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((man) => (
                                    <TableRow className="*:text-center" key={man._id}>
                                        <TableCell>{man.name}</TableCell>
                                        <TableCell>{man.phoneNumber}</TableCell>
                                        <TableCell>{bookingCounts[man.email] !== undefined ? bookingCounts[man.email] : <span className="loading loading-xs loading-spinner text-primary"></span>}</TableCell>
                                        <TableCell>
                                            <Button variant="success" onClick={() => handleChangeType(man._id, "DeliveryMen")}>Make Delivery Men</Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleChangeType(man._id, "Admin")}>Make Admin</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                }
            </div>

            {
                numberOfPages > 1 ?

                    <div className="mt-4">
                        <Pagination>
                            <PaginationContent className="flex flex-wrap">
                                <PaginationItem className="cursor-pointer" onClick={handlePrevPage}>
                                    <PaginationPrevious />
                                </PaginationItem>
                                {
                                    pages.map(page => <PaginationItem key={page} className="cursor-pointer"> <PaginationLink isActive={currentPage === page ? true : false} onClick={() => setCurrentPage(page)}>{page}</PaginationLink></PaginationItem>)
                                }
                                <PaginationItem className="cursor-pointer" onClick={handleNextPage}>
                                    <PaginationNext />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                    :
                    ""
            }
        </div>
    );
};

export default AllUsers;