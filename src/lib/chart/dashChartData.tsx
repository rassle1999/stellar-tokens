import axios from "axios";
import { BACKEND_URL } from "../basic/constant";
export const getDashChartData = async () =>{
    console.log("***************");
    const response = await axios.get(`${BACKEND_URL}/dash_price`);
    // const priceData = response.data.price;
    // console.log("priceData:",priceData);
    // return priceData;
}