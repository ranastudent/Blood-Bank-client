import {
      createBrowserRouter,

} from "react-router-dom";
import Main from "../layout.jsx/Main";
import ErrorPage from "../ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SearchDonars from "../pages/SearchDonars/SearchDonars";
import Login from "../pages/Login/Login";
import FoundingPage from "../Components/FoundingPage.jsx/FoundingPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout.jsx/Dashboard";
import Profile from "../pages/Dashboard/Profile/Profile";
import DonationRequest from "../pages/Dashboard/DonationRequest/DonationRequest";
import MyDonationRequest from "../pages/Dashboard/MyDonationRequest/MyDonationRequest";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import AllUser from "../pages/Dashboard/AllUser/AllUser";
import AllBloodDonationRequest from "../pages/Dashboard/AllBloodDonationRequest/AllBloodDonationRequest";

export const router = createBrowserRouter([
      {
            path: "/",
            element: <Main></Main>,
            errorElement: <ErrorPage></ErrorPage>,
            children: [
                  {
                        path: "/",
                        element: <Home></Home>
                  },
                  {
                        path: "login",
                        element: <Login></Login>,
                  },
                  {
                        path: "register",
                        element: <Register></Register>,
                  },

                  {
                        path: "searchDonars",
                        element: <SearchDonars></SearchDonars>
                  },
                  {
                        path: "founding",
                        element: <PrivateRoute><FoundingPage></FoundingPage></PrivateRoute>
                  },
            ]
      },
      {
            path: 'dashboard',
            element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
            errorElement: <ErrorPage></ErrorPage>,
            children: [
                  {
                        path:"/dashboard",
                        element:<DashboardHome></DashboardHome>
                  },
                  //admin route
                  {
                        path:"allUser",
                        element:<AllUser></AllUser>
                  },
                  {
                        path:"all-blood-donation-request",
                        element:<AllBloodDonationRequest></AllBloodDonationRequest>
                  },
                  //all user route
                  {
                        path:"profile",
                        element:<Profile></Profile>
                  },
                  {
                        path:"donationRequest",
                        element:<DonationRequest></DonationRequest>
                  },
                  {
                        path:"myDonationRequest",
                        element:<MyDonationRequest></MyDonationRequest>
                  },
            ]
      },
]);