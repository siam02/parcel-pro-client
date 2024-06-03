import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import Root from "@/layouts/Root";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "@/pages/Dashboard";
import DashboardLayout from "@/layouts/DashboardLayout";

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
                path:'/',
                element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
                children:[
                    {
                        path:'/dashboard',
                        element:<Dashboard></Dashboard>
                    }
                ]
            }
        ]
    }
])

export default routes;