import { Button } from "@/components/ui/button";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { useContext } from "react";
import Confetti from "react-confetti";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useWindowSize } from "react-use";

const PaymentSuccess = () => {
    const { width, height } = useWindowSize()
    const { siteName } = useContext(SiteDetailsContext);
    return (
        <div>
            <Helmet>
                <title>Payment Success - {siteName}</title>
            </Helmet>
            <Confetti
                width={width - 20}
                height={height}
            />

            <div>
                <div className="">
                    <div className="bg-white md:mx-auto">
                        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                            <path fill="currentColor"
                                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                            </path>
                        </svg>
                        <div className="text-center">
                            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                            <p className="text-gray-600 my-2">Thank you for using Parcel Pro to deliver your valuable goods</p>
                            <p> Have a great day!  </p>
                            <div className="py-5 text-center">
                                <Link to="/dashboard/my-parcels">
                                    <Button>GO BACK</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;