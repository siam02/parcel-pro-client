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
import DeliveryMenRoute from "./DeliveryMenRoute";
import MyDeliveryList from "@/pages/Dashboard/DeliveryMen/MyDeliveryList";
import MyReviews from "@/pages/Dashboard/DeliveryMen/MyReviews";

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
                    },
                    {
                        path:'my-delivery-list',
                        element:<DeliveryMenRoute><MyDeliveryList></MyDeliveryList></DeliveryMenRoute>
                    },
                    {
                        path:'my-reviews',
                        element:<DeliveryMenRoute><MyReviews></MyReviews></DeliveryMenRoute>
                    }
                ]
            }
        ]
    }
])

export default routes;