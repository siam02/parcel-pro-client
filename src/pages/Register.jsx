import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useToast } from "@/components/ui/use-toast";
import { TbReload } from "react-icons/tb";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";


const Register = () => {

    const { siteName } = useContext(SiteDetailsContext);
    const { createUser, user, updateUserProfile } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [registerText, setRegisterText] = useState('Create an account');
    const [error, setError] = useState(null);
    const { toast } = useToast();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    if (user) {
        return <Navigate to={'/'}></Navigate>;
    }


    const isURL = (str) => {
        const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
        return urlPattern.test(str);
    }

    const isEmail = (str) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(str);
    }

    const hasUppercase = (str) => {
        const pattern = /[A-Z]/;
        return pattern.test(str);
    }
    const hasSpecialCharacter = (str) => {
        const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
        return specialCharRegex.test(str);
    }
    const hasValidLength = (str) => {
        return str.length >= 6;
    }

    const handleRegister = e => {
        e.preventDefault();

        setRegisterText(
            <TbReload className="mr-2 h-4 w-4 animate-spin" />
        )

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photoURL');
        const email = form.get('email');
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        if (password != confirmPassword) {
            setError('Password and Confirm Password Must be same');
            setRegisterText('Create an account');
            return null;
        }

        if (!isURL(photo)) {
            setError('Please input a valid photo url');
            setRegisterText('Create an account');
            return null;
        }

        if (!isEmail(email)) {
            setError('Please input a valid email');
            setRegisterText('Create an account');
            return null;
        }

        if (!hasUppercase(password)) {
            setError('Password must contain at least one Upper Case');
            setRegisterText('Create an account');
            return null;
        }

        if (!hasSpecialCharacter(password)) {
            setError('Password must contain at least one Special Character');
            setRegisterText('Create an account');
            return null;
        }

        if (!hasValidLength(password)) {
            setError('Password must be at least 6 character long');
            setRegisterText('Create an account');
            return null;
        }

        if (hasUppercase(password) && hasSpecialCharacter(password) && hasValidLength(password) && isEmail(email) && isURL(photo)) {
            setError(null);
        }

        createUser(email, password)
            .then(({ user }) => {
                console.log(user);
                updateUserProfile(name, photo)
                    .then(() => {

                        const userInfo = {
                            name: user.displayName,
                            email: user.email,
                            type: "User"
                        }

                        axiosPublic.post('/users', userInfo)
                            .then(() => {
                                toast({
                                    variant: "success",
                                    description: "Your account successfully created!",
                                });

                                setRegisterText('Create an account');

                                navigate('/');
                            })
                            .catch(() => {
                                setError('User already exists');
                                setRegisterText('Create an account');
                            })

                    })
                    .catch(error => {
                        toast({
                            variant: "destructive",
                            description: error.message,
                        });
                        console.log(error);
                        setRegisterText('Create an account');
                    })
            })
            .catch(err => console.log(err))

    }



    return (
        <div className="my-16">
            <Helmet>
                <title>Create an account - {siteName}</title>
            </Helmet>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    {
                        error ?
                            <Alert variant="destructive" className="mb-6">
                                <ExclamationTriangleIcon className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {error}
                                </AlertDescription>
                            </Alert>
                            :
                            ''
                    }
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Albert Einstain"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="photoURL">Photo URL</Label>
                            <Input
                                id="photoURL"
                                name="photoURL"
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password" name="password"
                                    className="pr-8"
                                />
                                <span onClick={handleShowPassword} className="absolute right-3 top-2.5 text-muted-foreground">
                                    {showPassword ? (
                                        <IoEyeOffOutline className="h-4 w-4" />
                                    ) : (
                                        <IoEyeOutline className="h-4 w-4" />
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    id="confirmPassword" name="confirmPassword"
                                    className="pr-8"
                                />
                                <span onClick={handleShowPassword} className="absolute right-3 top-2.5 text-muted-foreground">
                                    {showPassword ? (
                                        <IoEyeOffOutline className="h-4 w-4" />
                                    ) : (
                                        <IoEyeOutline className="h-4 w-4" />
                                    )}
                                </span>
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            {registerText}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;