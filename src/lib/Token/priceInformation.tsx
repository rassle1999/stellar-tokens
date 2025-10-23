import axios from "axios";
import { Price } from "@/contexts/PriceContext";
import { BACKEND_URL } from "../constant";
import { Token } from '../../contexts/TokenContext';
import { b3 } from "wagmi/chains";
export const getPriceInformation = async (token:string) =>{
    const response = await axios.get(`${BACKEND_URL}/price/${token}/1m`);
    const priceData = response.data.price;
    console.log("priceData:",priceData);
    return priceData;
}