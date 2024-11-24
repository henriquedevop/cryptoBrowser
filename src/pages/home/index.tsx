import { Link } from "react-router";

export function Home() {
  return (
    <main className="p-5">
      <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
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
          <tr className="border-b hover:bg-gray-100">
            <td className="px-4 py-2">
              <Link to="detail/btc" className="text-blue-500 font-bold hover:underline">
                <span>Bitcoin | BTC</span>
              </Link>
            </td>
            <td className="hidden md:block px-4 py-2" data-label="market value">1T</td>
            <td className="px-4 py-2" data-label="price">58.000$</td>
            <td className="hidden md:block px-4 py-2" data-label="vol">54B</td>
            <td className="px-4 py-2" data-label="change24">16%</td>
          </tr>
        </tbody>
        
      </table>
    </main>
  );
}
