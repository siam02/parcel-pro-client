import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import Root from "@/layouts/Root";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardRoute from "./DashboardRoute";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element: <Login></Login>
            },
            {
                path:'/register',
                element: <Register></Register>
            },
            {
                path:'dashboard',
                element: <PrivateRoutes><DashboardRoute><DashboardLayout></DashboardLayout></DashboardRoute></PrivateRoutes>,
                children:[
                    {
                        path:'',
                        element:<Dashboard></Dashboard>
                    }
                ]
            }
        ]
    }
])

export default routes;