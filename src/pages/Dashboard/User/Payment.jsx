import CheckoutForm from "@/components/CheckoutForm";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const { siteName } = useContext(SiteDetailsContext);
    const parcel = useLoaderData();
    return (
        <div>
            <Helmet>
                <title>Payment - {siteName}</title>
            </Helmet>
            <div className="mb-4 flex md:flex-row flex-col md:justify-between justify-center md:text-left text-center items-center">
                <h1 className="text-xl font-bold">Payment: {parcel.price} Taka</h1>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm parcel={parcel}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;