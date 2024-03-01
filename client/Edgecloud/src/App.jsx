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
  const[contract, setContract]= useState([]);
  const[provider, setProvider]= useState(null);
  const[modalOpen, setModalOpen]= useState(false);

  useEffect(()=>{
    const provider = new ethers.BrowserProvider(window.ethereum);
   const wallet= async()=>{

    if(provider){
       //await provider.send("eth_requestAccount",[]);

       window.ethereum.on("accountsChanged",()=>{window.location.reload});
       const signer =await provider.getSigner();
       const address =await signer.getAddress();
       console.log(address);
       setAccount(address);
       const contractAddress= "0xB9dE16f9B2912De99837903BD646c21B74C92b4d";
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
  {!modalOpen && (
    <button className='share' onClick={()=> setModalOpen(true)}>Share</button>
  )}
  {
    modalOpen && (
      <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
    )
  }
    <div className='App'>
      <h1 style={{color:"white"}}>IoT EDGE CLOUD 3.0</h1>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
       
       <p style={{color: "white"}}>
        Account : {account}
       </p>
       <FileUpload account={account} contract={contract} provider={provider} ></FileUpload>
       <Display account={account} contract={contract}></Display>

    </div>
    </>
  )
}

export default App

// followed this : https://www.youtube.com/watch?v=M-KRLlHG_zs&list=LL&index=7