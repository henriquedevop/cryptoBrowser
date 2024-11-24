import { StarIcon, Bars3Icon, XMarkIcon, HomeIcon, MoonIcon } from "@heroicons/react/16/solid"
import { useState } from "react"
import { Link } from "react-router"
import { Search } from "../search"

export function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isThemeOn, setIsthemeOn] = useState(false)

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    function toggleTheme() {
        setIsthemeOn(!isThemeOn)
    }

    return (
        <header className={`h-8 w-full border-b-[1.5px] flex justify-between items-center px-5 py-10  ${isMenuOpen ? 'h-screen flex-col' : ''}`}>
                <div className="md:flex-1">
                    <Link to="/" className="text-xl"><h3><strong>Crypto</strong>Browser</h3></Link>
                </div>
                <div className={`md:flex-1 ${isMenuOpen ? 'hidden' : ''}`}>
                <Search/>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        <Bars3Icon className={`size-6 ${isMenuOpen ? 'hidden' : 'block'}`}/>
                    </button>
                    <button onClick={toggleMenu}>
                        <XMarkIcon className={`size-8 ${isMenuOpen ? 'block' : 'hidden'}`}/>
                    </button>
                </div>

            <nav className={`md:flex-row md:flex md:bg-white  flex-col gap-10 bg-slate-100 p-5 rounded-lg ${isMenuOpen ? 'flex flex-1 self-end w-full' : 'hidden'}`}>
                <Link className="md:text-base md:font-medium md:border-none flex font-bold text-xl items-center border-b-2 gap-3" to="/"> <HomeIcon className="size-6 text-slate-500"/> Home</Link>
                <a href="#" className="md:text-base md:font-medium md:border-none flex font-bold text-xl items-center border-b-2 gap-3"> <StarIcon className="size-6 text-slate-500"/> Favoritas</a>
                <button onClick={toggleTheme} className="md:text-base md:font-medium md:border-none flex font-bold text-xl items-center border-b-2 gap-3"> <MoonIcon className={`size-6 duration-200 ${isThemeOn ? 'text-white' : 'text-slate-500'}`}/>  Dark theme</button>
            </nav>

        </header>
    )
}