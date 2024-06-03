
import useUserType from "@/hooks/useUserType";
import { Link, NavLink, Outlet } from "react-router-dom"

const DashboardLayout = () => {

    const navLinkIsActive = ({ isActive }) => isActive ? "font-semibold text-primary" : "";
    const [userType] = useUserType();

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <Link to=""><h1 className="text-3xl font-semibold">Dashboard</h1></Link>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav
                        className="grid gap-4 text-sm text-muted-foreground"
                    >
                        {
                            userType === "DeliveryMen" ?
                                <>
                                    <NavLink to="my-delivery-list" className={navLinkIsActive}>My Delivery List</NavLink>
                                    <NavLink to="my-reviews" className={navLinkIsActive}>My Reviews</NavLink>
                                </>

                                :
                                ""

                        }
                    </nav>
                    <div>
                        <Outlet></Outlet>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;