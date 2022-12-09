import {React, useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { name, symbol, decimals, bal }  from "./redux/appreducer";
import { LoadBlockchain } from "./redux/appreducer";

function App() {
    const [amount, setAmount] = useState(0);
    const [tkaddress, setTkaddress] = useState("");
    const List = useSelector((e)=>e.conter);
    const {cont_provider, cont_signer, token_name,token_symbol, token_decimals, token_bal } = List;
    const dispatch = useDispatch();
    console.log(List);
    
    const loadMetadate = async ()=>{
        const contractname = await cont_provider.name();
        dispatch(name(contractname));
        const contractsymbol = await cont_provider.symbol();
        dispatch(symbol(contractsymbol));
        const contractdecimals = await cont_provider.decimals();
        const dec = contractdecimals.toString();
        dispatch(decimals(dec));
    }

    const minted = async()=>{
        const tx = await cont_signer.mint(amount);
        await tx.wait();
    }
    const tokenBal = async () => {
        const tokenbal = await cont_provider.balanceOf(tkaddress);
        dispatch(bal(tokenbal.toString()));
    }
 return (
    <>
        <button onClick={()=>dispatch(LoadBlockchain())}>Load Metamask</button>
        <h1>ERC20 MetaData</h1>
        <button onClick={()=>loadMetadate()}>Click for Metadata</button>
        <h3>Token Name is :-{token_name}</h3>
        <h3>Token Symbol is :- {token_symbol}</h3>
        <h3>Token decimals are:- {token_decimals}</h3>
        
        <h1>Enter Tokens to mint</h1> 
        <input value={amount} onChange = {(e)=> setAmount(e.target.value)} />
        
        <button onClick={()=>minted()}>Mint</button>

        <h1>Token Balnce</h1>
        <input value={tkaddress} onChange = {(e)=>setTkaddress(e.target.value)} />
        <button on onClick={()=>tokenBal()}>Click For Balance</button>
        <h3>Token Balance for address is:- {token_bal} GBS Tokens</h3>
        <h6>**Note Decimals are 10 "1 token= 10000000000"</h6>
    </>
  
 );
}

export default App;
