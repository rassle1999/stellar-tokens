import { FACTORY_ABI, FACTORY_ADDRESS,BACKEND_URL,TOKEN_ABI } from "../constant";
import { ethers } from "ethers";
export const buy = async (tokenAddress: string, amount: ethers.BigNumber, walletAddress: string, signer: any) => {
    const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);
    try {
        const tx= await factory.buy(tokenAddress, 0, walletAddress, { value: amount });
        console.log("Transaction Hash:", tx.hash);
        const receipt = await tx.wait();
        console.log("Transaction Confirmed:", receipt.transactionHash);
        return true;
    }
    catch(err){
        return false;
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
        return true;
    }
    catch(err){
        console.log("Sell Error!",err);
        return false;
    }
}