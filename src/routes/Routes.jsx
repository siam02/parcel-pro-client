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
                        path:'my-parcels/:id',
                        element:<UpdateParcel></UpdateParcel>,
                        loader: ({params}) => fetch(`http://127.0.0.1:5000/parcels-by-id/${params.id}`)
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
                    }
                ]
            }
        ]
    }
])

export default routes;