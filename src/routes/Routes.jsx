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
import BookParcel from "@/pages/Dashboard/User/BookParcel";
import MyProfile from "@/pages/Dashboard/User/MyProfile";
import MyParcels from "@/pages/Dashboard/User/MyParcels";
import UpdateParcel from "@/pages/Dashboard/User/UpdateParcel";
import AdminRoute from "./AdminRoute";
import Statistics from "@/pages/Dashboard/Admin/Statistics";
import AllParcels from "@/pages/Dashboard/Admin/AllParcels";
import AllDeliveryMen from "@/pages/Dashboard/Admin/AllDeliveryMen";
import AllUsers from "@/pages/Dashboard/Admin/AllUsers";
import Payment from "@/pages/Dashboard/User/Payment";
import PaymentSuccess from "@/pages/Dashboard/User/PaymentSuccess";

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
                    },
                    {
                        path:'book-parcel',
                        element:<BookParcel></BookParcel>
                    },
                    {
                        path:'my-profile',
                        element:<MyProfile></MyProfile>
                    },
                    {
                        path:'my-parcels',
                        element:<MyParcels></MyParcels>
                    },
                    {
                        path:'payment/:id',
                        element:<Payment></Payment>,
                        loader: ({params}) => fetch(`https://parcel-pro-server-beta.vercel.app/parcels-by-id/${params.id}`)
                    },
                    {
                        path:'my-parcels/:id',
                        element:<UpdateParcel></UpdateParcel>,
                        loader: ({params}) => fetch(`https://parcel-pro-server-beta.vercel.app/parcels-by-id/${params.id}`)
                    },
                    {
                        path:'payment-success',
                        element:<PaymentSuccess></PaymentSuccess>
                    },
                    {
                        path:'statistics',
                        element:<AdminRoute><Statistics></Statistics></AdminRoute>
                    },
                    {
                        path:'all-parcels',
                        element:<AdminRoute><AllParcels></AllParcels></AdminRoute>
                    },
                    {
                        path:'all-delivery-men',
                        element:<AdminRoute><AllDeliveryMen></AllDeliveryMen></AdminRoute>
                    },
                    {
                        path:'all-users',
                        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
                    }

                ]
            }
        ]
    }
])

export default routes;