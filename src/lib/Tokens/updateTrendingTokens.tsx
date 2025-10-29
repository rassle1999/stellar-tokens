import axios from "axios";
import { BACKEND_URL } from "../basic/constant";
export const updateTrendingTokens = async (setTrendingTokens: any) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/trending`);
    const trendingTokens = response.data.tokens;
    setTrendingTokens(trendingTokens);
  } catch (error) {
    console.error(error);
  }
};