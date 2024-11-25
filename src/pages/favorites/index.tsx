import { useEffect, useState } from "react";
import { Link } from "react-router";
import { LinkIcon, TrashIcon } from "@heroicons/react/16/solid";

export function Favorites() {

    const [favorites, setFavorites] = useState<{id: string; name: string}[]>([])

    useEffect(() => {
        const favs = getFavorites()
        setFavorites(favs)
    },[])

    function getFavorites() {
        const storedfavs = localStorage.getItem("cryptoFavorites")
        
        return storedfavs ? JSON.parse(storedfavs) : []
    }

    function removeFavorite(id: string) {
        const updateFavorites = favorites.filter((item) => item.id !== id);
        setFavorites(updateFavorites)
        localStorage.setItem("cryptoFavorites", JSON.stringify(updateFavorites))
    }

    return (
        <section className="w-full h-screen flex flex-col p-11">
            <div>
            <h1 className="font-bold text-3xl border-b-[1.5px] w-full">Minha Watchlist</h1>
            <div>
            {favorites.length === 0 ? (
                <>
                    <p className="mt-11 font-medium mb-5 text-lg">Você ainda não adicionou nenhuma moeda :(</p>
                    <Link to="/" className="p-2 bg-blue-600 rounded-md text-white font-bold">Volte para a Home</Link>
                </>
            ) : (
                <ul className="mt-7">
                    {favorites.map((item) => (
                        <li className="flex justify-between items-center mt-5 rounded-md bg-gray-50 p-2" key={item.id}>
                            <Link className="font-medium text-lg" to={`/detail/${item.id}`}>{item.name}</Link>
                            <div className="flex gap-2">
                            <Link 
                            className="text-base text-black rounded-md px-1 py-2 flex items-center"
                            to={`/detail/${item.id}`}> <LinkIcon className="size-5"/> Acessar</Link>
                            <button onClick={() => removeFavorite(item.id)} 
                            className="text-base text-black rounded-md p-1 flex items-center gap-1"
                            > <TrashIcon className="size-4"/> Remover</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            </div>
            </div>
        </section>
    )

}