import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { useContext } from "react";
import CountUp from "react-countup";
import { Helmet } from "react-helmet";
import { FaLocationDot, FaTruck } from "react-icons/fa6";
import { MdSupportAgent } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import DeliveryMan from "@/components/DeliveryMan";


const Home = () => {
    const { siteName } = useContext(SiteDetailsContext);
    const axiosPublic = useAxiosPublic();


    const { data: userCount } = useQuery({
        queryKey: ['userCount'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/userCount`);
            return res.data?.count;
        }
    })

    const { data: parcelsCount } = useQuery({
        queryKey: ['parcelsCount'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/parcelsCount`);
            return res.data?.count;
        }
    })

    const { data: deliveredParcelsCount } = useQuery({
        queryKey: ['deliveredParcelsCount'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/deliveredParcelsCount`);
            return res.data?.count;
        }
    })

    const { data: deliveryMen = [] } = useQuery({
        queryKey: ['deliveryMen'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/top-delivery-men`);
            return res.data;
        }
    })



    return (
        <div>
            <Helmet>
                <title>Home - {siteName}</title>
            </Helmet>

            <div className="hero mt-8 rounded-3xl" style={{ backgroundImage: 'url(https://img.freepik.com/premium-vector/courier-with-parcel-background-delivery-service-van_327176-173.jpg?w=1380)' }}>
                <div className="hero-overlay rounded-3xl bg-opacity-60"></div>
                <div className="hero-content py-28 text-center text-neutral-content">
                    <div className="max-w-2xl flex flex-col items-center text-white">
                        <h1 className="md:text-7xl text-4xl font-black">{siteName}</h1>
                        <h2 className="mb-3 sm:text-2xl text-xl font-bold">Delivering Your Parcels with Speed and Care</h2>
                        <p className="mb-5 sm:text-lg text-base">At ParcelPro, we are committed to providing a seamless and reliable parcel delivery service.</p>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="search" className="bg-white dark:border-0" placeholder="Search......" />
                            <Button type="submit">Search</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-24">
                <section className="">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                        <div className="max-w-screen-md text-center mx-auto mb-8 lg:mb-16">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Features</h2>
                            <p className="text-gray-500 sm:text-xl dark:text-gray-400">Discover the key features that make ParcelPro your go-to solution for fast, reliable, and secure parcel delivery.</p>
                        </div>
                        <div className="space-y-8 text-center md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                            <div>
                                <div className="flex mx-auto justify-center items-center mb-4 w-12 h-12 rounded-full bg-primary-100 lg:h-14 lg:w-14 dark:bg-primary-900">
                                    <FaLocationDot className="w-6 h-6 text-primary lg:w-7 lg:h-7 dark:text-primary-300" />
                                </div>
                                <h3 className="mb-2 text-2xl font-bold dark:text-white">Live Parcel Tracking</h3>
                                <p className="text-gray-500 dark:text-gray-400">Our courier app enables you to live track & know the real time status of your parcel.</p>
                            </div>
                            <div>
                                <div className="flex mx-auto justify-center items-center mb-4 w-12 h-12 rounded-full bg-primary-100 lg:h-14 lg:w-14 dark:bg-primary-900">
                                    <FaTruck className="w-6 h-6 text-primary lg:w-7 lg:h-7 dark:text-primary-300" />
                                </div>
                                <h3 className="mb-2 text-2xl font-bold dark:text-white">100% Safe Delivery</h3>
                                <p className="text-gray-500 dark:text-gray-400">We deliver parcels with full responsibility in every corner of Bangladesh by providing 100% Safety Coverage.</p>
                            </div>
                            <div>
                                <div className="flex mx-auto justify-center items-center mb-4 w-12 h-12 rounded-full bg-primary-100 lg:h-14 lg:w-14 dark:bg-primary-900">
                                    <MdSupportAgent className="w-6 h-6 text-primary lg:w-8 lg:h-8 dark:text-primary-300" />
                                </div>
                                <h3 className="mb-2 text-2xl font-bold dark:text-white">24/7 Call Center Support</h3>
                                <p className="text-gray-500 dark:text-gray-400">ParcelPro ensures 24/7 call center agent support for all sorts of queries and specific relationship managers.</p>
                            </div>

                        </div>
                    </div>
                </section>
                <div className="mt-6">
                    <div className="mx-auto">
                        <dl className="bg-white dark:bg-gray-700 rounded-lg shadow-lg sm:grid sm:grid-cols-3">
                            <div className="flex flex-col p-6 text-center border-b border-gray-100 sm:border-0 sm:border-r">
                                <dt className="text-2xl text-primary font-bold" id="item-1">
                                    Parcel Booked
                                </dt>
                                <dd className="text-3xl mt-2 font-bold" aria-describedby="item-1">
                                    <CountUp end={parcelsCount} duration={2}></CountUp>
                                </dd>
                            </div>
                            <div className="flex flex-col p-6 text-center border-t border-b border-gray-100 sm:border-0 sm:border-l sm:border-r">
                                <dt className="text-2xl text-primary font-bold">
                                    Parcel Delivered
                                </dt>
                                <dd className="text-3xl mt-2 font-bold">
                                    <CountUp end={deliveredParcelsCount} duration={2}></CountUp>
                                </dd>
                            </div>
                            <div className="flex flex-col p-6 text-center border-t border-gray-100 sm:border-0 sm:border-l">
                                <dt className="text-2xl text-primary font-bold">
                                    People Using Our App
                                </dt>
                                <dd className="text-3xl mt-2 font-bold">
                                    <CountUp end={userCount} duration={2}></CountUp>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <section className="text-gray-600 mt-24">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex max-w-screen-md mx-auto flex-col text-center w-full mb-20">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                            The Top Delivery Man
                        </h2>
                        <p className="text-gray-500 sm:text-xl dark:text-gray-400">
                            Meet our top delivery men who consistently deliver excellence and ensure your parcels reach their destination safely and on time.
                        </p>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {
                            deliveryMen.map(man => <DeliveryMan key={man._id} man={man}></DeliveryMan>)
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;