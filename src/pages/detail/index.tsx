import { useEffect, useState } from "react"
import api from "../../services/cryptoService"
import { getUsdToBrl } from "../../services/currencyService"
import { CryptoProps } from "../home"
import { useNavigate } from "react-router"
import { useParams } from "react-router"
import { Loading } from "../../components/loading"
import { toast } from "react-toastify"

export function Detail() {

  const { crypto } = useParams()
  const navigate = useNavigate()
  const [cryptoInfo, setCryptoInfo] = useState<CryptoProps | null>(null)
  const [UsdBrlCambio, setUsdBrlCambio] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(!crypto) return
    async function fetchData() {
    try {
      const [cryptoResponse, brlValue] = await Promise.all([
        api.get(`assets/${crypto}`),
        getUsdToBrl()
      ])

      const data = cryptoResponse.data.data

      const priceFormatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      });

      const priceCompacter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact"
      });

      setCryptoInfo({
        ...data,
          formatedPrice: priceFormatter.format(Number(data.priceUsd)),
          formatedMarket: priceCompacter.format(Number(data.marketCapUsd)),
          formatedValue: priceCompacter.format(Number(data.volumeUsd24Hr)),
          formattedSupply: priceCompacter.format(Number(data.supply)),
      })

      if(brlValue > 0 && data.priceUsd) {
        const cambioUsdToBrl = Number(data.priceUsd) * brlValue
        const cambioFormatter = Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        })
        setUsdBrlCambio(cambioFormatter.format(cambioUsdToBrl))
      }
      setLoading(false)

    } catch (err) {
      console.log("Erro ao buscar dados", err)
      navigate("/")
    }
  }
  fetchData()
  },[crypto, navigate])

  function handleAddFav(id: string | undefined, name: string | undefined) {

    if(!id || !name) {
      alert("informaçoes da moeda invalida")
      return
    }

    try {
      const storedfavs = localStorage.getItem("cryptoFavorites")
      const favorites = storedfavs ? JSON.parse(storedfavs) : [];

      const isAlreadyFavorite = favorites.some((item: {id: string}) => item.id === id)
      if(isAlreadyFavorite) {
        toast.warning("Essa moeda já esta na sua lista")
        return
      }

      const newFavorite = { id, name};
      favorites.push(newFavorite)

      localStorage.setItem("cryptoFavorites", JSON.stringify(favorites));
      toast.success(`${name} foi adiciona a sua lista`)
    } catch(error) {
      toast.error("Opss, algo deu errado")
    }

  }

    if(loading) {
      return <Loading message={`Carregando informações sobre ${crypto || 'a moeda'}`}/>
    }

    return (
      <>
      <section className="w-full h-screen p-4 flex flex-col gap-3 mt-5">
        <div className="flex items-center gap-2">
          <img
          alt={`crypto logo: ${cryptoInfo?.name}`}
          src={`https://assets.coincap.io/assets/icons/${cryptoInfo?.symbol.toLocaleLowerCase()}@2x.png`}
          className="w-10"
          />
          <h3 className="font-medium text-lg">{cryptoInfo?.name}</h3>
          <span className="text-sm text-gray-500">{cryptoInfo?.symbol}</span>
          <span className="bg-gray-200 mb-1 rounded-md px-3 text-sm text-gray-600">#{cryptoInfo?.rank}</span>
        </div>
        <div className="flex items-start mt-3 flex-col">
          <div>
            <span className="font-bold text-2xl">{cryptoInfo?.formatedPrice}</span>
            <span 
            className={`px-4 py-2 font-bold
            ${Number(cryptoInfo?.changePercent24Hr) > 0 ? 'text-green-600' : 'text-red-600'} `} 
            >
            {Number(cryptoInfo?.changePercent24Hr) > 0 ? '+' : ''}
            {Number(cryptoInfo?.changePercent24Hr).toFixed(2)}%
            </span>
          </div>
          <div>
            <span className="text-sm">Convertido para BRL: <span className="font-medium">{UsdBrlCambio}</span></span>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <div className="flex items-center flex-col border flex-1 rounded-md py-2">
            <span className="text-zinc-400">Market cap</span>
            <span className="font-bold">{cryptoInfo?.formatedMarket}</span>
          </div>
          <div className="flex items-center flex-col border flex-1 rounded-md py-2">
            <span className="text-zinc-400">Volume 24h</span>
            <span className="font-bold">{cryptoInfo?.formatedValue}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center flex-col border flex-1 rounded-md py-2">
            <span className="text-zinc-400">Explorer</span>
            <span className="font-bold text-blue-400 underline"><a target="_blank" href={cryptoInfo?.explorer}>Acesse o site oficial</a></span>
          </div>
          <div className="flex items-center flex-col border flex-1 rounded-md py-2">
            <span className="text-zinc-400">Total supply</span>
            <span className="font-bold">{cryptoInfo?.formattedSupply}</span>
          </div>
        </div>
        <div className="text-center mt-3">
          <button onClick={() => handleAddFav(cryptoInfo?.id, cryptoInfo?.name)} 
          className="bg-green-500 text-white font-bold p-3 rounded-md">
          Adicionar as favoritas</button>
        </div>
      </section>
      </>
    )
  }
  