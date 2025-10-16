import  axios from "axios";
import { Token } from "@/contexts/TokenContext";
export const getTokensInformation = async () => {
    const response = await axios.get('http://localhost:5000/tokens');
    const swapResponse = await axios.get('http://localhost:5000/swap');
    console.log('swapResponse', swapResponse.data);
    return response.data.map((token: any) => {
        const priceData = swapResponse.data.filter((swap: any) => swap.token.toLowerCase() === token.address.toLowerCase());
        const price = priceData.pop()?.price || "0";
        const real_price = parseFloat(price)/(10**18);
        let priceChange=0;
        if(priceData.length >0)
        {
            priceChange = (parseFloat(price)-parseFloat(priceData.pop().price))*100/parseFloat(price);
        }
        const MarketCap = (parseFloat(price) * parseFloat(token.totalSupply) / (10 ** 36)).toString() || "0";
        const date = new Date(token.createdAt * 1000);
        const dateString = date.toUTCString();
        return {
            id: token._id,
            name: token.name,
            symbol: token.symbol,
            image: token.uriData.image,
            marketCap: MarketCap,
            price: real_price,
            priceChange: priceChange,
            createdAt: dateString,
            address: token.address,
            ethReserveCap: 0,
            currentReserve: 0,
        };
    });
}