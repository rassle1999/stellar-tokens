import axios from "axios";
import { BACKEND_URL } from "../basic/constant";
export const getPriceInformation = async (token:string,mode:string) =>{
    const response = await axios.get(`${BACKEND_URL}/price/${token}/${mode}`);
    const priceData = response.data.price;
    console.log("priceData:",priceData);
    return priceData;
}