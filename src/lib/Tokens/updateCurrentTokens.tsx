import axios from "axios";
import { BACKEND_URL } from "../constant";
export const updateCurrentTokens = async (setCurrentTokens:any,page:number,mode:string) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/tokens/${page}/${mode}`);
    const currentTokens = response.data.tokens;
    setCurrentTokens(currentTokens);
  } catch (error) {
    console.error(error);
  }
};