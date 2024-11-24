import { createBrowserRouter, Navigate } from "react-router";

import { Home } from "./pages/home";
import { Detail } from "./pages/detail";
import { NotFound } from "./pages/notfound";

const router = createBrowserRouter([
    {
        children: [
            {path: "/", element: <Home/>},
            {path: "/detail", element: <Navigate to={"/"}/>},
            {path: "/detail/:crypto", element: <Detail/>},
            {path: "*", element: <NotFound/>},
        ]
    }
])

export { router }