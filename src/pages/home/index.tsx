import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import api from "../../services/cryptoService";
import { Loading } from "../../components/loading";

export interface CryptoProps {
  changePercent24Hr: string,
  explorer: string,
  id: string,
  marketCapUsd: string,
  maxSupply: string,
  name: string,
  priceUsd: string,
  rank: string,
  supply: string,
  symbol: string,
  volumeUsd24Hr: string,
  vwap24Hr: string,
  formatedPrice?: string,
  formatedMarket?: string,
  formatedValue?: string,
  formattedSupply?: string,
}

export function Home() {

  const [cryptos, setCryptos] = useState<CryptoProps[]>([])
  const [offSet, setOffSet] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  },[offSet])

  function handleGetMore() {
    if(offSet === 0) {
      setOffSet(10)
      return
    }

    setOffSet(offSet + 10)
  }

  async function getData() {
    try {
      
      const response = await api.get("assets", {params: { limit: 10, offset: offSet }});

      const cryptoData = response.data.data
      
      const priceFormatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      });

      const priceCompacter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact"
      });

      const formatedResult = cryptoData.map((item: CryptoProps) => ({
        ...item,
        formatedPrice: priceFormatter.format(Number(item.priceUsd)),
        formatedMarket: priceCompacter.format(Number(item.marketCapUsd)),
        formatedValue: priceCompacter.format(Number(item.volumeUsd24Hr)),
      }))

      const listCoins = [...cryptos, ...formatedResult]
      setCryptos(listCoins);
      setLoading(false)
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  function handleTrClick(id: string) {
    navigate(`/detail/${id}`)
  }

  if(loading) {
    return <Loading message="Carregando home page"/>
  }

  return (
    <main className="md:px-16 p-5 w-full">
      <table className="border-separate border-spacing-y-4 w-full table-auto">
        <thead>
          <tr className="text-black border-b-[1.5px]">
            <th scope="col" className="px-4 py-2 text-left">Moeda</th>
            <th scope="col" className="hidden md:block px-4 py-2 text-left">Valor de mercado</th>
            <th scope="col" className="px-4 py-2 text-left">Preço</th>
            <th scope="col" className="hidden md:block px-4 py-2 text-left">Volume</th>
            <th scope="col" className="px-4 py-2 text-left">Mudança 24h</th>
          </tr>
        </thead>
        
        <tbody id="tbody">
          {cryptos.length > 0 && cryptos.map((item) => (
          <tr 
          className="bg-gray-50 cursor-pointer hover:bg-gray-100" 
          key={item.id}
          ref={(el) => { if(el) el.addEventListener('click', () => handleTrClick(item.id)) }}
          >
            <td className="px-4 py-4 text-left">
              <img
              alt={`crypto logo: ${item.name}`}
              src={`https://assets.coincap.io/assets/icons/${item.symbol.toLocaleLowerCase()}@2x.png`}
              className="w-6"
              />
              <Link to={`/detail/${item.id}`} className="font-bold hover:underline ">
                <span className=""><span className="text-sm text-zinc-600">{item.rank}</span> {item.name} <span className="text-zinc-400 text-xs">{item.symbol}</span></span>
              </Link>
            </td>
            <td className=" hidden md:block px-4 py-4" data-label="marketvalue">{item.formatedMarket}</td>
            <td className="px-4 py-2 font-medium" data-label="price">{item.formatedPrice}</td>
            <td className="hidden md:block px-4 py-7" data-label="vol">{item.formatedValue}</td>
            <td 
            className={`px-4 py-2 font-bold
            ${Number(item.changePercent24Hr) > 0 ? 'text-green-600' : 'text-red-600'}  
            `} 
            data-label="change24">
            {Number(item.changePercent24Hr) > 0 ? '+' : ''}
            {Number(item.changePercent24Hr).toFixed(2)}%
            </td> 
          </tr>
          ))}
        </tbody>
        
      </table>
      <button onClick={handleGetMore} className="bg-green-500 rounded-md p-1 text-white font-bold mt-3">Buscar mais...</button>
    </main>
  );
}
