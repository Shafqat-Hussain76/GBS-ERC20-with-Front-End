import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
//import { ethers } from "hardhat";
import { ethers } from "ethers";
import MYERC20 from "../artifacts/contracts/GBSERC20.sol/MYERC20.json";
const contract_address = "0xaA07bB340046d92D295e30Abe37aDbd1e377C053"; //goerli

const initialState = {
    cont_signer: null,
    cont_provider: null,
    token_bal: null,
    token_name: null,
    token_symbol: null,
    token_decimals:null,

};
export const LoadBlockchain = createAsyncThunk("LoadBlockchain", async(_, thunkAPI)=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const contractp = new ethers.Contract(contract_address, MYERC20.abi, provider);
    const contracts = new ethers.Contract(contract_address, MYERC20.abi, signer);

    return {
        contractp,
        contracts
    }
});

const appSlicer = createSlice({
    name: "counter",
    initialState,
    reducers:{
        name:(state, action) => {
            state.token_name = action?.payload;
        },
        symbol: (state, action) => {
            state.token_symbol = action?.payload;
        },
        decimals: (state, action) => {
            state.token_decimals = action?.payload;
        },
        bal: (state, action) => {
            state.token_bal = action?.payload;
        }
    },
    extraReducers: {
        [LoadBlockchain.fulfilled.toString()]: (state, {payload})=>{
            state.cont_provider = payload?.contractp;
            state.cont_signer= payload?.contracts;
        }
    }
    
});
export const { name, symbol, decimals, bal } = appSlicer.actions;
export const appReducer = appSlicer.reducer;
