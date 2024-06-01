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

    const handleLoginWithGoogle = () => {
        setloginWithGoogleText(
            <TbReload className="mr-2 h-4 w-4 animate-spin" />
        )

        signInWithGoogle()
            .then(({user}) => {
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    type: "user"
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
                setloginWithGoogleText('Google');
            })
    }




    return (
        <div className="my-16">
            <Helmet>
                <title>Login - {siteName}</title>
            </Helmet>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
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
                        <Button onClick={handleLoginWithGoogle} variant="outline" className="w-full">
                            <FaGoogle className="mr-2 h-4 w-4" /> {loginWithGoogleText}
                        </Button>
                        {/* <Button variant="outline" onClick={handleLoginWithGitHub} className="w-full">
                            <FaGithub className="mr-2 h-4 w-4" /> {loginWithGithubText}
                        </Button> */}
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="#" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;