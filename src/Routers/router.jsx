import {
      createBrowserRouter,
      
    } from "react-router-dom";
import Main from "../layout.jsx/Main";
import ErrorPage from "../ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SearchDonars from "../pages/SearchDonars/SearchDonars";
import Login from "../pages/Login/Login";

  export  const router = createBrowserRouter([
      {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                  path:"/",
                  element:<Home></Home>
            },
            {
                  path:"login",
                  element:<Login></Login>,
            },
            {
                  path:"register",
                  element:<Register></Register>,
            },
            
            {
                  path:"searchDonars",
                  element:<SearchDonars></SearchDonars>
            }
        ]
      },
    ]);