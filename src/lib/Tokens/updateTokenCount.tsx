import { BACKEND_URL } from "../basic/constant";
import axios from "axios";
export const updateTokenCount = async (setTokenCount,search?:string) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/tokenCount/search=${search}`);
        setTokenCount(response.data.tokenCount);
    } catch (error) {
        console.error(error);
    }
};
//Changed