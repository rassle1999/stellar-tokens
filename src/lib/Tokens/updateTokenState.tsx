import axios from "axios";
import { BACKEND_URL } from "../basic/constant";
import { isMigrated } from "../BondingCurve/getBondingCurveInfo";
export const updateTokenState = async (setTableTokens,count:number,provider:any) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/state/${count}`);
    const tokenData = response.data.tokens;
    // const tableData = Promise.all(tokenData.map(async (token)=>{
    //   const Migrated = await isMigrated(token.address,provider);
    //   return {...token,isMigrated:Migrated}
    // }));
    setTableTokens(tokenData);
  } catch (error) {
    console.error(error);
  }
};