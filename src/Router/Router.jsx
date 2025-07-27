import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Authentication/Register/Register";
import Login from "../Authentication/Login";
import PrivateRoute from "../Routes/PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import AddPackage from "../Pages/Dashboard/AddPackage/AddPackage";
import PackageDetailsPage from "../Pages/PackageDetails/PackageDetailsPage";
import MyBookings from "../Pages/Dashboard/MyBookings/MyBookings";
import Payment from "../Pages/Dashboard/Payment/Payment";
import AddStory from "../Pages/Dashboard/AddStory/AddStory";
import ManageStories from "../Pages/Dashboard/ManageStories/ManageStories";
import UpdateStory from "../Pages/Dashboard/UpdateStory/UpdateStory";
import ManageProfile from "../Pages/Dashboard/ManageProfile/ManageProfile";
import JoinAsTourGuide from "../Pages/Dashboard/JoinAsTourGuide/JoinAsTourGuide";
import AllTrips from "../Pages/Home/AllTrips/AllTrips";
import AboutUs from "../Pages/Home/AboutUs/AboutUs";
import CommunityPage from "../Pages/Home/CommunityPage/CommunityPage";
import NotFoundPage from "../Shared/NotFoundPage/NotFoundPage";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },

      {
        path: "/packages/:id",
        // Component: PackageDetailsPage,
        element:<PrivateRoute><PackageDetailsPage></PackageDetailsPage></PrivateRoute>
      },
      {
        path:'all-trips',
        Component:AllTrips
      },
      {
        path:'about',
        Component:AboutUs
      },
      {
        path:'communitypage',
        Component:CommunityPage
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


      {
        path:'manageprofile',
        Component:ManageProfile
      },
      {
        path: "my-bookings",
        Component: MyBookings
      },
      {
        path: 'payment/:bookingId',
        Component: Payment
      },
      {
        path:'join-as-guide',
        Component:JoinAsTourGuide
      },
      {
        path: "add-story",
        Component: AddStory
      },
      {
        path: "my-story",
        Component: ManageStories
      },
      {
        path: "update-story/:id",
        Component: UpdateStory
      },
      {
        path: "add-package",
        Component: AddPackage
      },
    ],
  },
  {
     path: "/*",
    Component:NotFoundPage
  }
]);