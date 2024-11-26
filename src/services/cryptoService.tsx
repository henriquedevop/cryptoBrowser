import axios from "axios";

const api = axios.create({
    baseURL: "https://api.coincap.io/v2/",
    timeout: 30000,
})

export default api;