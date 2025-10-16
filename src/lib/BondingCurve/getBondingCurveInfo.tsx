import  axios from "axios";
import { Token } from "@/contexts/TokenContext";
export const getBondingCurveInfo = async (address:string) => {
    const response = await axios.get(`http://localhost:5000/bondingCurve/${address}`);
    return response.data;
}