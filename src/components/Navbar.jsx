import { FaBox } from "react-icons/fa";
import { CgMenuLeft } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FaRegCircleUser } from "react-icons/fa6";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, } from "@/components/ui/sheet"

const Navbar = () => {

    // const navLinkClasses = `${(isActive, isPending) => { isPending ? "text-muted-foreground" : isActive ? "text-foreground" : "" }} transition-colors hover:text-foreground`;
    const navLinkIsActive = (isActive, isPending) => isPending ? "text-muted-foreground" : isActive ? "text-foreground" : "text-muted-foreground";
    const navLinkClasses = navLinkIsActive() + ' transition-colors hover:text-foreground';

    return (
        <div>
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <NavLink
                        to="/"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <FaBox className="h-6 w-6" />
                        ParcelPro

                    </NavLink>
                    <NavLink
                        to="/"
                        className={navLinkClasses}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/orders"
                        className={navLinkClasses}
                    >
                        Orders
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={navLinkClasses}
                    >
                        Products
                    </NavLink>
                    <NavLink
                        href="#"
                        className={navLinkClasses}
                    >
                        Customers
                    </NavLink>
                    <NavLink
                        href="#"
                        className={navLinkClasses}
                    >
                        Settings
                    </NavLink>
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
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <FaBox className="h-6 w-6" />
                                ParcelPro
                            </NavLink>
                            <NavLink
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Orders
                            </NavLink>
                            <NavLink
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Products
                            </NavLink>
                            <NavLink
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Customers
                            </NavLink>
                            <NavLink href="#" className="hover:text-foreground">
                                Settings
                            </NavLink>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <FaRegCircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </div>
    );
};

export default Navbar;