import { Link } from "react-router"

export function NotFound() {

    return (
      <div className="w-full h-screen items-center flex flex-col justify-center gap-3">
        <span className="text-xl">404</span>
        <h2 className="font-bold text-3xl">Opps, algo deu errado</h2>
        <h2 className="text-base font-medium">Nós não conseguimos achar sua página</h2>
        <Link to="/" className="p-2 bg-blue-600 rounded-md text-white font-bold">Volte para a Home</Link>
      </div>
    )
  }
  