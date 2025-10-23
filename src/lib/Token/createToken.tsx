import { FACTORY_ABI, FACTORY_ADDRESS, BACKEND_URL } from "../constant";
import { ethers } from "ethers";
import axios from "axios";
export const createToken = async (name: string, symbol: string, uri: string, initialSupply: ethers.BigNumber, signer: any) => {
    const factory = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);
    try {
        const tx = await factory.deployToken(name, symbol, uri, initialSupply);
        console.log("Transaction Hash:", tx.hash);
        const receipt = await tx.wait();
        console.log("Transaction Confirmed:", receipt.transactionHash);
        console.log("log:", receipt.events);
        const event = receipt.events?.find(e => e.event === "Deployed");
        let tokenAddress;
        const iface = new ethers.utils.Interface(FACTORY_ABI);

        for (const log of receipt.events) {
            try {
                const parsed = iface.parseLog(log);
                console.log("parsed",parsed);
                if (parsed.name === "Deployed") {
                    console.log("Token address:", parsed.args.token);
                    tokenAddress=parsed.args.token;
                }
            } catch (err) {
            }
        }
        axios.post(`${BACKEND_URL}/deploy`, { address: tokenAddress, uri: uri, totalSupply: initialSupply.toString(), symbol: symbol, name: name });
    }
    catch (err) {
        console.log("Deploy Error!", err);
    }
}