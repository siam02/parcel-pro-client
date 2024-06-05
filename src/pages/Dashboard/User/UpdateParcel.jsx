import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { useToast } from "@/components/ui/use-toast";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TbReload } from "react-icons/tb";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import FormError from "@/components/Form/FormError";
import { useLoaderData } from "react-router-dom";

const UpdateParcel = () => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm();


    const { user } = useAuth();
    const { siteName } = useContext(SiteDetailsContext);
    const [error, setError] = useState(null);
    const { toast } = useToast();
    const [submitText, setSubmitText] = useState('Update');
    const axiosSecure = useAxiosSecure();

    const parcel = useLoaderData();

    const { 
        _id,
        phoneNumber,
        parcelType,
        parcelWeight,
        receiverName,
        receiverPhone,
        deliveryAddress,
        reqDeliveryDate,
        latitude,
        longitude,
        price
        } = parcel;

    const onSubmit = data => {

        setSubmitText(
            <TbReload className="mr-2 h-4 w-4 animate-spin" />
        )

        const phoneNumber = data.phoneNumber;
        const parcelType = data.parcelType;
        const parcelWeight = parseInt(data.parcelWeight);
        const receiverName = data.receiverName;
        const receiverPhone = data.receiverPhone;
        const deliveryAddress = data.deliveryAddress;
        const reqDeliveryDate = data.reqDeliveryDate;
        const latitude = parseFloat(data.latitude);
        const longitude = parseFloat(data.longitude);
        const price = parcelWeight <= 2 ? parcelWeight * 50 : 150;

        const updateParcel = {
            phoneNumber,
            parcelType,
            parcelWeight,
            receiverName,
            receiverPhone,
            deliveryAddress,
            reqDeliveryDate,
            latitude,
            longitude,
            price,
        }

        console.log(updateParcel);

        axiosSecure.put(`/parcels/${_id}`, updateParcel)
            .then(({ data }) => {

                if (data.modifiedCount > 0) {
                    toast({
                        variant: "success",
                        description: "Your parcel successfully updated",
                    });
                    setError(null);
                    setSubmitText('Update');
                }else{
                    setSubmitText('Update');
                }

            })
            .catch(err => {
                toast({
                    variant: "destructive",
                    description: err.message,
                });
                setError(err.message);
                setSubmitText('Update');
            })

    }

    return (
        <div>
            <div className="">
                <Helmet>
                    <title>Update a Parcel - {siteName}</title>
                </Helmet>

                <Card>
                    <CardHeader>
                        <CardTitle>Update Parcel no. {_id} </CardTitle>
                        <CardDescription>
                            Easily book your parcel for delivery with our user-friendly and efficient booking system
                        </CardDescription>
                        {
                            error ?
                                <Alert variant="destructive">
                                    <ExclamationTriangleIcon className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        {error}
                                    </AlertDescription>
                                </Alert>
                                :
                                ''
                        }
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Your Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        defaultValue={user.displayName}
                                        required
                                        readOnly
                                        disabled
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={user.email}
                                        readOnly
                                        disabled
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input
                                        id="phoneNumber"
                                        type="tel"
                                        defaultValue={phoneNumber}
                                        {...register('phoneNumber', { required: true, pattern: /^[0-9]{11}$/ })}
                                        placeholder="01234567891"
                                        className={errors.phoneNumber && 'border-red-600 bg-red-100'}
                                    />
                                    <FormError name="phoneNumber" errors={errors}></FormError>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="parcelType">Parcel Type</Label>
                                    <Input
                                        id="parcelType"
                                        type="text"
                                        {...register('parcelType', { required: true })}
                                        placeholder="Parcel Type"
                                        defaultValue={parcelType}
                                        className={errors.parcelType && 'border-red-600 bg-red-100'}
                                    />
                                    <FormError name="parcelType" errors={errors}></FormError>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="parcelType">Parcel Weight</Label>
                                    <Input
                                        id="parcelWeight"
                                        type="number"
                                        {...register('parcelWeight', { required: true, min: 1 })}
                                        placeholder="Parcel Weight"
                                        defaultValue={parcelWeight}
                                        className={errors.parcelWeight && 'border-red-600 bg-red-100'}
                                    />
                                    <FormError name="parcelWeight" errors={errors}></FormError>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="receiverName">Receiver’s Name</Label>
                                    <Input
                                        id="receiverName"
                                        type="text"
                                        {...register('receiverName', { required: true })}
                                        placeholder="Receiver’s Name"
                                        className={errors.receiverName && 'border-red-600 bg-red-100'}
                                        defaultValue={receiverName}
                                    />
                                    <FormError name="receiverName" errors={errors}></FormError>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="receiverPhone">Receiver&apos;s Phone Number</Label>
                                    <Input
                                        id="receiverPhone"
                                        type="tel"
                                        {...register('receiverPhone', { required: true, pattern: /^[0-9]{11}$/ })}
                                        placeholder="01234567891"
                                        className={errors.receiverPhone && 'border-red-600 bg-red-100'}
                                        defaultValue={receiverPhone}
                                    />
                                    <FormError name="receiverPhone" errors={errors}></FormError>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="deliveryAddress">Parcel Delivery Address</Label>
                                    <Input
                                        id="deliveryAddress"
                                        type="text"
                                        {...register('deliveryAddress', { required: true })}
                                        placeholder="Parcel Delivery Address"
                                        className={errors.deliveryAddress && 'border-red-600 bg-red-100'}
                                        defaultValue={deliveryAddress}
                                    />
                                    <FormError name="deliveryAddress" errors={errors}></FormError>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="reqDeliveryDate">Requested Delivery Date</Label>

                                    <Input
                                        id="reqDeliveryDate"
                                        type="date"
                                        min={new Date().toISOString().slice(0, 10)}
                                        {...register('reqDeliveryDate', { required: true })}
                                        placeholder="Requested Delivery Date"
                                        className={errors.reqDeliveryDate && 'border-red-600 bg-red-100'}
                                        defaultValue={reqDeliveryDate}
                                    />
                                    <FormError name="reqDeliveryDate" errors={errors}></FormError>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="latitude">Delivery Address Latitude</Label>

                                    <Input
                                        id="latitude"
                                        type="number"
                                        step="any"
                                        {...register('latitude', { required: true, min: -90, max: 90 })}
                                        placeholder="Delivery Address Latitude"
                                        className={errors.latitude && 'border-red-600 bg-red-100'}
                                        defaultValue={latitude}
                                    />
                                    <FormError name="latitude" errors={errors}></FormError>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="latitude">Delivery Address Longitude</Label>

                                    <Input
                                        id="longitude"
                                        type="number"
                                        step="any"
                                        {...register('longitude', { required: true, min: -90, max: 90 })}
                                        placeholder="Delivery Address Longitude"
                                        defaultValue={longitude}
                                        className={errors.longitude && 'border-red-600 bg-red-100'}
                                    />
                                    <FormError name="longitude" errors={errors}></FormError>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price (Tk)</Label>

                                    <Input className="relative"
                                        id="price"
                                        type="number"
                                        defaultValue={price}
                                        readOnly
                                        // {...register('price', {min:50} )}
                                        value={watch('parcelWeight') && (watch('parcelWeight') <= 2 ? watch('parcelWeight') * 50 : 150)}
                                        disabled
                                    />
                                </div>

                            </div>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button>{submitText}</Button>
                        </CardFooter>
                    </form>




                </Card>
            </div>
        </div>
    );
};

export default UpdateParcel;