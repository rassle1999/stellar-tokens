import axios from "axios";
import { BACKEND_URL } from "../constant";
export const updateCurrentTokens = async (setCurrentTokens:any,page:number) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/tokens/${page}/date`);
    const currentTokens = response.data.tokens;
    setCurrentTokens(currentTokens);
  } catch (error) {
    console.error(error);
  }
};