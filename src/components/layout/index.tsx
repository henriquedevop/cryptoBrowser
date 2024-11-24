import { Header } from "../header"
import { Footer } from "../footer"
import { Outlet } from "react-router"

export function Layout() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}