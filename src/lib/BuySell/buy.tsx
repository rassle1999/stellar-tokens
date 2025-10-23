import { FACTORY_ABI, FACTORY_ADDRESS,BACKEND_URL,TOKEN_ABI } from "../constant";
import { ethers } from "ethers";
import axios from "axios";
export const buy = async (tokenAddress: string, amount: ethers.BigNumber, walletAddress: string, signer: any) => {
    const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);
    try {
        const tx= await factory.buy(tokenAddress, 0, walletAddress, { value: amount });
        console.log("Transaction Hash:", tx.hash);
        const receipt = await tx.wait();
        console.log("Transaction Confirmed:", receipt.transactionHash);
        const iface = new ethers.utils.Interface(FACTORY_ABI);
        let amountIn,amountOut,price,direction;
        for (const log of receipt.events) {
            try {
                const parsed = iface.parseLog(log);
                console.log("parsed",parsed);
                if (parsed.name === "Swap") {
                    console.log("Token address:", parsed.args.token);
                    tokenAddress=parsed.args.token;
                    amountIn=parsed.args.amountIn.toString();
                    amountOut=parsed.args.amountOut.toString();
                    price=parsed.args.price.toString();
                    direction=parsed.args.direction;
                }
            } catch (err) {
            }
        }
        const response = await axios.post(`${BACKEND_URL}/buy`,{token:tokenAddress,amountIn:amountIn,amountOut:amountOut,price:price,direction:direction});
        console.log("response:", response.data);
    }
    catch(err){
        console.log("Buy Error!",err);
    }
}

export const sell = async (tokenAddress: string, amount: ethers.BigNumber, walletAddress: string, signer: any) => {
    const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);
    const tokenContract = new ethers.Contract(tokenAddress,TOKEN_ABI,signer);
    try {
        const approveTx = await tokenContract.approve(FACTORY_ADDRESS,amount);
        await approveTx.wait();
        console.log("Approved");
        const tx= await factory.sell(tokenAddress,amount, 0, walletAddress);
        console.log("Transaction Hash:", tx.hash);
        const receipt = await tx.wait();
        console.log("Transaction Confirmed:", receipt.transactionHash);
        const iface = new ethers.utils.Interface(FACTORY_ABI);
        let amountIn,amountOut,price,direction;
        for (const log of receipt.events) {
            try {
                const parsed = iface.parseLog(log);
                console.log("parsed",parsed);
                if (parsed.name === "Swap") {
                    console.log("Token address:", parsed.args.token);
                    tokenAddress=parsed.args.token;
                    amountIn=parsed.args.amountIn.toString();
                    amountOut=parsed.args.amountOut.toString();
                    price=parsed.args.price.toString();
                    direction=parsed.args.direction;
                }
            } catch (err) {
            }
        }
        const response = await axios.post(`${BACKEND_URL}/buy`,{token:tokenAddress,amountIn:amountIn,amountOut:amountOut,price:price,direction:direction});
        console.log("response:", response.data);
    }
    catch(err){
        console.log("Sell Error!",err);
    }
}