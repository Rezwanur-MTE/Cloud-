import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {ethers} from 'ethers'
import Upload from './artifacts/contracts/Upload.sol/Upload.json'

import Display from './components/Display'
import FileUpload from './components/FileUpload'
import Modal from './components/Modal'


function App() {
  const [count, setCount] = useState(0);
  const [account, setAccount]= useState('');
  const[contract, setContract]= useState(null);
  const[provider, setProvider]= useState(null);
  const[modalOpen, SetModalOpen]= useState(false);

  useEffect(()=>{
    const provider = new ethers.BrowserProvider(window.ethereum);
   const wallet= async()=>{

    if(provider){
      // await provider.send("eth_requestAccount",[]);
       const signer = provider.getSigner();
       const address = (await signer).getAddress();
       console.log(address);
       setAccount(address);
       const contractAddress= "0x5FbDB2315678afecb367f032d93F642f64180aa3";
       const contract = new ethers.Contract(contractAddress,Upload.abi, signer);
       console.log(contract);
       setContract(contract);
       setProvider(signer);
    } else{
      alert("Cannot Recognise Metamask!")
    }
    
   }

   provider && wallet()

  },[])

  return (
    <>

     
    </>
  )
}

export default App
