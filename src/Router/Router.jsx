import {createBrowserRouter} from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Authentication/Register/Register";
import Login from "../Authentication/Login";
export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home
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
]);