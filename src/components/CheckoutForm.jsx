import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { TbReload } from "react-icons/tb";


const CheckoutForm = ({parcel}) => {

    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const { price, _id, paymentStatus } = parcel;
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { user } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [submitText, setSubmitText] = useState('Pay');



    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, price]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        setSubmitText(
            <TbReload className="mr-2 h-4 w-4 animate-spin" />
        )

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.error(confirmError);
            setSubmitText("Pay");

            toast({
                variant: "destructive",
                description: "Something went wrong",
            });

        }
        else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                const payment = {
                    paymentStatus: "Paid"
                }

                const res = await axiosSecure.patch(`/parcels/payment/${_id}`, payment);

                setSubmitText("Pay");

                if (res.data?.modifiedCount > 0) {
                    toast({
                        variant: "success",
                        description: "You have successfully paid for your booking",
                    });

                    navigate('/dashboard/payment-success')
                }

            }
        }

    }

    if (paymentStatus === "Paid") {
        return <Navigate to={location?.state ? location.state : '/dashboard/my-parcels'}></Navigate>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="flex justify-center">
                <Button variant="success" className="mt-4 mx-auto" type="submit" disabled={!stripe || !clientSecret}>
                    {submitText}
                </Button>
            </div>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;