import {createBrowserRouter} from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Authentication/Register/Register";
import Login from "../Authentication/Login";
import PackageDetails from "../Pages/PackageDetails/PackageDetails";

import PrivateRoute from "../Routes/PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import AddPackage from "../Pages/Dashboard/AddPackage/AddPackage";
export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
            path:'PackageDetails',
            Component:PackageDetails
        }
    ]
  },
  {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      

       // Tourist Routes
    // { path: "my-bookings", element: <MyBookings /> },
    // { path: "my-story", element: <MyStory /> },

    // // Tour Guide Routes
    // { path: "add-story", element: <GuideRoute><AddStory /></GuideRoute> },
    // { path: "my-assigned-tours", element: <GuideRoute><MyAssignedTours /></GuideRoute> },

    // Admin Routes
    { path: "add-package",
      Component:AddPackage
      },
    // { path: "manage-bookings", element: <AdminRoute><ManageBookings /></AdminRoute> },
    // { path: "all-stories", element: <AdminRoute><AllStories /></AdminRoute> },
    // { path: "all-users", element: <AdminRoute><AllUsers /></AdminRoute> },
    ],
  },
]);