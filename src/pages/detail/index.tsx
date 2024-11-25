import { useEffect, useState } from "react"
import api from "../../services/api"
import { CryptoProps } from "../home"
import { useNavigate } from "react-router"
import { useParams } from "react-router"
import { Loading } from "../../components/loading"

export function Detail() {

  const { crypto } = useParams()
  const navigate = useNavigate()
  const [cryptoInfo, setCryptoInfo] = useState<CryptoProps | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(crypto) {
      getInfo(crypto)
    }
  },[crypto])

  async function getInfo(crypto: string) {
    try {

      const response = await api.get(`assets/${crypto}`)
      const data = response.data.data

      const priceFormatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      });
  
      const priceCompacter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact"
      });
      
      setCryptoInfo( {
        ...data,
        formatedPrice: priceFormatter.format(Number(data.priceUsd)),
        formatedMarket: priceCompacter.format(Number(data.marketCapUsd)),
        formatedValue: priceCompacter.format(Number(data.volumeUsd24Hr)),
        formattedSupply: priceCompacter.format(Number(data.supply)),
        formattedMaxSupply: priceCompacter.format(Number(data.maxSupply)),
      })
      setLoading(false)

    } catch (err) {
      console.log('error', err)
      navigate("/")
    }
  }

    if(loading) {
      return <Loading message={`Carregando informações sobre ${crypto}`}/>
    }

    return (
      <>
      <section className="w-full h-screen p-4 flex flex-col gap-3">
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
        <div className="flex items-center">
        <span className="font-bold text-2xl">{cryptoInfo?.formatedPrice}</span>
        <span 
        className={`px-4 py-2 font-bold
        ${Number(cryptoInfo?.changePercent24Hr) > 0 ? 'text-green-600' : 'text-red-600'} `} 
        >
        {Number(cryptoInfo?.changePercent24Hr) > 0 ? '+' : ''}
        {Number(cryptoInfo?.changePercent24Hr).toFixed(2)}%
        </span>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center flex-col border flex-1 rounded-md">
            <span className="text-gray-600">Market cap</span>
            <span className="font-bold">{cryptoInfo?.formatedMarket}</span>
          </div>
          <div className="flex items-center flex-col border flex-1 rounded-md">
            <span className="text-gray-600">Volume 24h</span>
            <span className="font-bold">{cryptoInfo?.formatedValue}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center flex-col border flex-1 rounded-md">
            <span className="text-gray-600">Max. suplly</span>
            <span className="font-bold">{cryptoInfo?.formattedMaxSupply}</span>
          </div>
          <div className="flex items-center flex-col border flex-1 rounded-md">
            <span className="text-gray-600">Total supply</span>
            <span className="font-bold">{cryptoInfo?.formattedSupply}</span>
          </div>
        </div>
      </section>
      </>
    )
  }
  