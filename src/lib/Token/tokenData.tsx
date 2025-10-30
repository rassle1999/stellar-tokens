import axios from "axios";
import { BACKEND_URL } from "../basic/constant";
export const getTokenDatabyAddress = async (address:string) =>{
    const response = await axios.get(`${BACKEND_URL}/token/${address}`);
    const token = response.data.token;
    return token;
}