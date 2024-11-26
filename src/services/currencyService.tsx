import axios from "axios";

const CURRENCY_API_URL = "https://economia.awesomeapi.com.br/last/USD-BRL"

export const getUsdToBrl = async () => {
    try {
        const response = await axios.get(CURRENCY_API_URL)
        return response.data.USDBRL.bid
    } catch {
        console.log('algo deu errado')
    }
}