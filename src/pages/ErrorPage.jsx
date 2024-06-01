import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { SiteDetailsContext } from "../providers/SiteDetailsProvider";


const ErrorPage = () => {

    const { siteName } = useContext(SiteDetailsContext);

    return (
        <div className="mx-auto">
            <Helmet>
                <title>404 Error - {siteName}</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="flex gap-10 my-32 justify-center items-center px-4">
                <div className="text-center">
                    <img src="https://i.ibb.co/MfDbDJ1/Humaaans-Space.png" className="mx-auto" alt="" />
                </div>
                <div className="text-center">
                    <h1 className="text-9xl font-black text-gray-600 mb-4">404</h1>

                    <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

                    <p className="mt-4 text-lg text-gray-500">We can&apos;t find that page.</p>

                    <Link
                        href="/"
                        className="btn btn-primary text-white mt-4 border-0 !h-auto px-7 py-5 text-lg font-bold"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ErrorPage;