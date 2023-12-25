import axios from "axios";


const baseURL = "https://api-cache-test.leanagri.com";
const axiosInstance = axios.create({
    baseURL,
    timeout: 1000,
    headers: {
        "content-type": "application/json",
        "accept": "application/json",
    },
})

export const getCrops = () => axiosInstance.get('/pop/pop_list/en/64/pop_list.json');