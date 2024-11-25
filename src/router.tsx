import { createBrowserRouter, Navigate } from "react-router";

import { Home } from "./pages/home";
import { Detail } from "./pages/detail";
import { Favorites } from "./pages/favorites";
import { NotFound } from "./pages/notfound";

import { Layout } from "./components/layout";

const router = createBrowserRouter([
    {   
        element: <Layout/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "/detail", element: <Navigate to={"/"}/>},
            {path: "/detail/:crypto", element: <Detail/>},
            {path: "/favorites", element: <Favorites/>},
            {path: "*", element: <NotFound/>},
        ]
    }
])

export { router }