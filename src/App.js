import './App.css';
import {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";


function App() {

  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Make sure you have metamask!");
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if(accounts.length !== 0){
      console.log("Authorized account: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    }else{
      console.log("No accounts!")
    }
  }
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
    if(currentAccount){
     return <Navigate to="/main" replace={true} />;
    }
  }

  const check = () => {
    if(!currentAccount){
      return(
      <div className="App">
        <div className='app-container'>
          <div className='app-label'>
            <img src='https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/SamCopeland/phpZC7lK9.png' alt="chess" />
            <div className='label-text'>
              <label>Chess.com</label>
            </div>
            <button onClick={connectWallet}>Connect</button>
          </div>
        </div>
      </div>
      )
    }else{
      return <Navigate to="/main" replace={true} />
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    
  }, [])

  return (
    check()
  );
}

export default App;
