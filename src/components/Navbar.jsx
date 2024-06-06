import { FaBox } from "react-icons/fa";
import { CgMenuLeft } from "react-icons/cg";
import { Link, NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FaRegCircleUser } from "react-icons/fa6";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, } from "@/components/ui/sheet"
import { useContext } from "react";
import { SiteDetailsContext } from "@/providers/SiteDetailsProvider";
import { AuthContext } from "@/providers/AuthProvider";
import { useToast } from "./ui/use-toast";

const Navbar = () => {

    const { siteName } = useContext(SiteDetailsContext);
    const { user, logOut } = useContext(AuthContext);
    const { toast } = useToast()
    const navLinkIsActive = ({ isActive }) => (isActive ? "text-foreground" : "text-muted-foreground") + " transition-colors hover:text-foreground";
    const navLinks = <>
        <NavLink className={navLinkIsActive} to="/">Home</NavLink>
    </>

    const handleSignOut = () => {
        logOut()
            .then(() => {
                toast({
                    variant: "success",
                    description: "Logged out success!",
                });
            })
            .catch(error => {
                toast({
                    variant: "destructive",
                    description: error.messagee,
                });
            })
    }

    return (
        <header className="sticky z-20 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <NavLink
                    to="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <FaBox className="h-6 w-6" />
                    {siteName}

                </NavLink>
                {navLinks}
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <CgMenuLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <NavLink
                            to="/"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <FaBox className="h-6 w-6" />
                            ParcelPro
                        </NavLink>
                        {navLinks}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <CiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
                {
                    user ?
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                {
                                    user.photoURL ?
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <img className="rounded-full h-8 w-8" src={user.photoURL} />
                                            <span className="sr-only">Toggle user menu</span>
                                        </Button>
                                        :
                                        <Button variant="secondary" size="icon" className="rounded-full">
                                            <FaRegCircleUser className="h-5 w-5" />
                                            <span className="sr-only">Toggle user menu</span>
                                        </Button>
                                }
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Link to="/dashboard" >Dashboard</Link></DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 cursor-pointer hover:!text-red-600" onClick={handleSignOut}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        :
                        <Link to="/login"><Button>Login</Button></Link>

                }
            </div>
        </header>
    );
};

export default Navbar;