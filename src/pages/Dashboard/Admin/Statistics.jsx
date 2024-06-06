import useAxiosSecure from "@/hooks/useAxiosSecure";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import Chart from "react-apexcharts";


const Statistics = () => {

    const { siteName } = useContext(SiteDetailsContext);
    const axiosSecure = useAxiosSecure();

    const { data: statistics = [], isLoading } = useQuery({
        queryKey: ['statistics'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/statistics`);
            return res.data;
        }
    })

    const { bookings, delivered, dates } = statistics;

    const bookingOptions = {
        chart: {
            id: 'bookings-bar-chart',
        },
        xaxis: {
            categories: dates,
        },
        title: {
            text: 'Bookings by Date',
        },
    };

    const deliveredOptions = {
        chart: {
            id: 'delivered-line-chart',
        },
        xaxis: {
            categories: dates,
        },
        title: {
            text: 'Booked vs Delivered Parcels',
        },
    };

    const bookingSeries = [
        {
            name: 'Bookings',
            data: bookings,
        },
    ];

    const deliveredSeries = [
        {
            name: 'Booked',
            data: bookings,
        },
        {
            name: 'Delivered',
            data: delivered,
        },
    ];

    return (
        <div>
            <Helmet>
                <title>Statistics - {siteName}</title>
            </Helmet>
            <div className="mb-4 flex md:flex-row flex-col md:justify-between justify-center md:text-left text-center items-center">
                <h1 className="text-xl font-bold">Statistics</h1>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                {
                    isLoading ?
                        <div className="flex justify-center my-10"><span className="loading loading-lg loading-spinner text-primary"></span></div>
                        :

                        <>
                            <div>
                                <Chart
                                    options={bookingOptions}
                                    series={bookingSeries}
                                    type="bar"
                                />
                            </div>
                            <div>
                                <Chart
                                    options={deliveredOptions}
                                    series={deliveredSeries}
                                    type="line"
                                />
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default Statistics;