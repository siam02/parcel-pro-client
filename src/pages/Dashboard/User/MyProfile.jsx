import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "@/providers/AuthProvider";
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
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;



const MyProfile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const { siteName } = useContext(SiteDetailsContext);
    const [updateText, setUpdateText] = useState('Update Details');
    const [userPhotoURL, setUserPhotoURL] = useState(user.photoURL);
    const [error, setError] = useState(null);
    const { toast } = useToast();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const handleUpdate = async (e) => {
        e.preventDefault();

        setUpdateText(
            <TbReload className="mr-2 h-4 w-4 animate-spin" />
        )

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const imageFile = form.get('photoURL');
        let photoURL = user.photoURL;

        let res;

        if (imageFile.size > 0) {
            const imageData = new FormData();
            imageData.append('image', imageFile);

            res = await axiosPublic.post(image_hosting_api, imageData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (res?.data.success) {
                photoURL = res.data.data.display_url;
            } else {
                toast({
                    variant: "destructive",
                    description: "Something went wrong",
                });
                console.error(res);
            }
        }

        updateUserProfile(name, photoURL)
            .then(() => {

                const photo = photoURL;
                const updateProfile = { name, photo };

                axiosSecure.put(`/users/${user.email}`, updateProfile, { withCredentials: true })
                    .then(({ data }) => {
                        if (data.modifiedCount > 0) {
                            toast({
                                variant: "success",
                                description: "Profile updated!",
                            });
                            setUserPhotoURL(photoURL);
                            setUpdateText('Update Details');
                        }
                    })
                    .catch(err => {
                        toast({
                            variant: "destructive",
                            description: err.message,
                        });
                        setError(err.message);
                        setUpdateText('Update Details');
                    })


            })
            .catch(error => {
                toast({
                    variant: "destructive",
                    description: error.message,
                });
                setError(error.message);
                setUpdateText('Update Details');
            })
    }
    return (
        <div className="">
            <Helmet>
                <title>Update Profile - {siteName}</title>
            </Helmet>

            <Card>
                <CardHeader>
                    <CardTitle>Update Profile</CardTitle>
                    <CardDescription>
                        Update your profile anytime at ease
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
                <form onSubmit={handleUpdate}>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    readOnly
                                    disabled
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Your Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    defaultValue={user.displayName}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="photoURL">Photo</Label>
                                <Input
                                    id="photoURL"
                                    type="file"
                                    name="photoURL"

                                />
                            </div>
                            <div className="form-control">
                                <Label htmlFor="currentPhoto">Your Current Photo</Label>
                                <img src={userPhotoURL} width={150} height={150} className="mt-2 rounded-md" alt="" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>{updateText}</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default MyProfile;