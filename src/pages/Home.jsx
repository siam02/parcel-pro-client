import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { useContext } from "react";
import { Helmet } from "react-helmet";

const Home = () => {
    const { siteName } = useContext(SiteDetailsContext);
    return (
        <div>
            <Helmet>
                <title>Home - {siteName}</title>
            </Helmet>

            <div className="hero mt-8 rounded-3xl" style={{ backgroundImage: 'url(https://img.freepik.com/premium-vector/courier-with-parcel-background-delivery-service-van_327176-173.jpg?w=1380)' }}>
                <div className="hero-overlay rounded-3xl bg-opacity-60"></div>
                <div className="hero-content py-28 text-center text-neutral-content">
                    <div className="max-w-2xl flex flex-col items-center text-white">
                        <h1 className="text-7xl font-black">{siteName}</h1>
                        <h2 className="mb-3 text-2xl font-bold">Delivering Your Parcels with Speed and Care</h2>
                        <p className="mb-5 text-lg">At ParcelPro, we are committed to providing a seamless and reliable parcel delivery service.</p>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="search" className="bg-white dark:border-0" placeholder="Search......" />
                            <Button type="submit">Search</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-24">
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                        <div className="max-w-screen-md text-center mx-auto mb-8 lg:mb-16">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Features</h2>
                            <p className="text-gray-500 sm:text-xl dark:text-gray-400">Discover the key features that make ParcelPro your go-to solution for fast, reliable, and secure parcel delivery.</p>
                        </div>
                        <div className="space-y-8 text-center md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                            <div>
                                <div className="flex mx-auto justify-center items-center mb-4 w-12 h-12 rounded-full bg-primary-100 lg:h-14 lg:w-14 dark:bg-primary-900">
                                    <svg className="w-6 h-6 text-primary lg:w-8 lg:h-8 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                </div>
                                <h3 className="mb-2 text-2xl font-bold dark:text-white">Live Parcel Tracking</h3>
                                <p className="text-gray-500 dark:text-gray-400">Our courier app enables you to live track & know the real time status of your parcel.</p>
                            </div>
                            <div>
                                <div className="flex mx-auto justify-center items-center mb-4 w-12 h-12 rounded-full bg-primary-100 lg:h-14 lg:w-14 dark:bg-primary-900">
                                    <svg className="w-6 h-6 text-primary lg:w-8 lg:h-8 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
                                </div>
                                <h3 className="mb-2 text-2xl font-bold dark:text-white">100% Safe Delivery</h3>
                                <p className="text-gray-500 dark:text-gray-400">We deliver parcels with full responsibility in every corner of Bangladesh by providing 100% Safety Coverage.</p>
                            </div>
                            <div>
                                <div className="flex mx-auto justify-center items-center mb-4 w-12 h-12 rounded-full bg-primary-100 lg:h-14 lg:w-14 dark:bg-primary-900">
                                    <svg className="w-6 h-6 text-primary lg:w-8 lg:h-8 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>
                                </div>
                                <h3 className="mb-2 text-2xl font-bold dark:text-white">24/7 Call Center Support</h3>
                                <p className="text-gray-500 dark:text-gray-400">ParcelPro ensures 24/7 call center agent support for all sorts of queries and specific relationship managers.</p>
                            </div>

                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default Home;