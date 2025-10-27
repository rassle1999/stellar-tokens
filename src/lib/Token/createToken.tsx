import { FACTORY_ABI, FACTORY_ADDRESS, BACKEND_URL } from "../basic/constant";
import { ethers } from "ethers";
import axios from "axios";
export const createToken = async (name: string, symbol: string, uri: string, initialSupply: ethers.BigNumber, signer: any) => {
    const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);
    try {
        const tx = await factory.deployToken(name, symbol, uri, initialSupply);
        console.log("Transaction Hash:", tx.hash);
        const receipt = await tx.wait();
        console.log("Transaction Confirmed:", receipt.transactionHash);
        return true;
    }
    catch (err) {
        console.log("Deploy Error!", err);
        return false;
    }
}