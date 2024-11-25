import { StarIcon, Bars3Icon, XMarkIcon, HomeIcon, MoonIcon, SunIcon } from "@heroicons/react/16/solid"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { Search } from "../search"

export function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isThemeOn, setIsthemeOn] = useState(false)

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    function closeMenu() {
        setIsMenuOpen(false)
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if(savedTheme === 'dark') {
            setIsthemeOn(true)
            document.body.classList.add('dark')
        }
    },[])

    function toggleTheme() {
        setIsthemeOn(!isThemeOn)
        if(isThemeOn) {
            document.body.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        } else {
            document.body.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        }
    }

    return (
        <header className={`md:px-16 h-8 w-full border-b-[1.5px] flex justify-between items-center px-5 py-10  ${isMenuOpen ? 'h-screen flex-col' : ''}`}>
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

            <nav className={`md:flex-row md:flex md:bg-white flex-col gap-7 bg-slate-100 p-1 rounded-lg ${isMenuOpen ? 'flex flex-1 self-end w-full' : 'hidden'}`}>
                <Link onClick={closeMenu} 
                className="md:text-base md:mt-0 md:font-medium md:border-none flex font-bold text-xl items-center border-b-2 gap-3 mt-5" 
                to="/"> <HomeIcon className="size-6 text-slate-500"/> Home</Link>
                <Link onClick={closeMenu} to="/favorites" 
                className="md:text-base md:font-medium md:border-none flex font-bold text-xl items-center border-b-2 gap-3">
                <StarIcon className="size-6 text-slate-500"/> Watchlist</Link>
                <button onClick={toggleTheme} 
                className="md:text-base md:font-medium md:border-none flex font-bold text-xl items-center border-b-2 gap-3">
                {isThemeOn ? (<SunIcon className="size-6 text-gray-500"/>) : (<MoonIcon className="size-6 text-gray-500"/>)}
                {isThemeOn ? 'Light theme' : 'Dark theme'}
                </button>
            </nav>

        </header>
    )
}