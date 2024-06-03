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
const MyProfile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const { siteName } = useContext(SiteDetailsContext);
    const [updateText, setUpdateText] = useState('Update Details');
    const [userPhotoURL, setUserPhotoURL] = useState(user.photoURL);
    const [error, setError] = useState(null);
    const { toast } = useToast()

    const handleUpdate = e => {
        e.preventDefault();

        setUpdateText(
            <TbReload className="mr-2 h-4 w-4 animate-spin" />
        )

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photoURL = form.get('photoURL');

        updateUserProfile(name, photoURL)
            .then(() => {
                toast({
                    variant: "success",
                    description: "Profile updated!",
                });
                setUserPhotoURL(photoURL);
                setUpdateText('Update Details');
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
                            <div role="alert" className="alert p-2 mt-4 rounded-lg alert-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span><strong>Error!</strong> {error}</span>
                            </div>
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
                                <Label htmlFor="photoURL">Photo URL</Label>
                                <Input
                                    id="photoURL"
                                    type="text"
                                    name="photoURL"
                                    defaultValue={userPhotoURL}
                                    required
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