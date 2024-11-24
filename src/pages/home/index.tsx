import { Link } from "react-router";

export function Home() {

  return (
    <main>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor de mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>
        
        <tbody id="tbody"> 
          <tr>
            <td>
              <Link to="detail/btc"><span>Bitcoin | BTC</span></Link>
            </td>
            <td data-label="market value">1T</td>
            <td data-label="price">58.000</td>
            <td data-label="vol">54B</td>
            <td data-label="change24">16%</td>
          </tr>
        </tbody>
      </table>

    </main>
  );
}