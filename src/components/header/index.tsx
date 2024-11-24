import { StarIcon } from "@heroicons/react/16/solid"
import { Link } from "react-router"

export function Header() {
    return (
        <header className="h-8 w-full border-b-[1.5px] flex justify-between items-center p-11">
            <div>
                <Link to="/"><h3><strong>Crypto</strong>Browser</h3></Link>
            </div>

            <nav className="flex gap-5">
                <a href="#"> Home</a>
                <a href="#" className="flex"> <StarIcon className="size-6 text-slate-500"/> Favoritas</a>
            </nav>

            <div>
                <a href="#">Dark theme</a>
            </div>
        </header>
    )
}