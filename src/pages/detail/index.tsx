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
      })
      setLoading(false)

    } catch (err) {
      console.log('error', err)
      navigate("/")
    }
  }

    function teste() {
      console.log(cryptoInfo)
    }

    if(loading) {
      return <Loading message={`Carregando informações sobre ${crypto}`}/>
    }

    return (
      <>
      <button onClick={teste}>{cryptoInfo?.name}</button>
      <h1 className="text-3xl font-bold underline">
        pagina de detalhes {crypto}
      </h1>
      </>
    )
  }
  