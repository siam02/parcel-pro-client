import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/providers/AuthProvider";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import { useToast } from "@/components/ui/use-toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"


const Login = () => {
    const { signIn, user, signInWithGoogle, signInWithGitHub } = useContext(AuthContext);
    const { siteName } = useContext(SiteDetailsContext);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [loginText, setLoginText] = useState('Login');
    const [loginWithGoogleText, setloginWithGoogleText] = useState('Login with Google');
    const [loginWithGithubText, setLoginWithGithubText] = useState('Login with GitHub');
    const { toast } = useToast()
    const axiosPublic = useAxiosPublic();


    if (user) {
        return <Navigate to={location?.state ? location.state : '/'}></Navigate>;
    }

    const handleLogin = e => {
        e.preventDefault();

        setLoginText(
            <TbReload className="mr-2 h-4 w-4 animate-spin" />
        )
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        if (email === '') {
            setError('Please enter your email')
        }

        if (password === '') {
            setError('Please enter your password')
        }

        signIn(email, password)
            .then(() => {
                toast({
                    variant: "success",
                    description: "Logged in success!",
                });

                navigate(location?.state ? location.state : '/');

            }
            )
            .catch(error => {
                toast({
                    variant: "destructive",
                    description: error.message,
                });
                setLoginText('Login');
            })
    }

    const handleLoginWithGoogle = () => {
        setloginWithGoogleText(
            <TbReload className="mr-2 h-4 w-4 animate-spin" />
        )

        signInWithGoogle()
            .then(({ user }) => {
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    type: "User"
                }
                axiosPublic.post('/users', userInfo);
                toast({
                    variant: "success",
                    description: "Logged in success!",
                });
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                toast({
                    variant: "destructive",
                    description: error.message,
                });
                setloginWithGoogleText('Login with Google');
            })
    }

    const handleLoginWithGitHub = () => {
        setLoginWithGithubText(
            <TbReload className="mr-2 h-4 w-4 animate-spin" />
        )

        signInWithGitHub()
            .then(({ user }) => {
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    type: "User"
                }
                axiosPublic.post('/users', userInfo);
                toast({
                    variant: "success",
                    description: "Logged in success!",
                });
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                toast({
                    variant: "destructive",
                    description: error.message,
                });
                setLoginWithGithubText('Login with GitHub');
            })
    }




    return (
        <div className="my-16">
            <Helmet>
                <title>Login - {siteName}</title>
            </Helmet>
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
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email & password below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            {loginText}
                        </Button>
                        <Button onClick={handleLoginWithGoogle} type="button" variant="outline" className="w-full">
                            <FaGoogle className="mr-2 h-4 w-4" /> {loginWithGoogleText}
                        </Button>
                        <Button variant="outline" type="button" onClick={handleLoginWithGitHub} className="w-full">
                            <FaGithub className="mr-2 h-4 w-4" /> {loginWithGithubText}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;