import axios from "axios";
import { BACKEND_URL } from "../basic/constant";
export const updateCurrentTokens = async (setCurrentTokens: any, page: number, mode: string, search: string) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/tokens/${page}/${mode}/search=${search}`);
    const currentTokens = response.data.tokens;
    setCurrentTokens(currentTokens);
  } catch (error) {
    console.error(error);
  }
};