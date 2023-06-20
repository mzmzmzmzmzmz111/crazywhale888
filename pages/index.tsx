import { useState } from 'react';
import { ConnectKitButton } from "connectkit";
import type { NextPage } from 'next';
import BigNumber from 'bignumber.js'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faTelegram, faMedium } from '@fortawesome/free-brands-svg-icons'
import Countdown from './Countdowns';
import logo from './logo.png'
import { useAccount, useSendTransaction, useWaitForTransaction } from 'wagmi';
import { useSoldAmount, useTokenBalance } from '../hooks/useBalance';
import { parseEther } from 'viem';
import { toast } from 'react-toastify';

const Home: NextPage = () => {
  const [amount, setAmount] = useState("");

  const { address } = useAccount()
  const tokenBal = useTokenBalance();
  const sold = useSoldAmount();

  const { data, sendTransaction } = useSendTransaction({
    to: '0x4aC72735cC32C8bef3331EcDC155f92672B83F12',
    //@ts-ignore
    value: parseEther(amount),
    //@ts-ignore
    gas: 200000,
    data: '0x3b254d0a',
  })

  const registerToken = async () => {
    //@ts-ignore
    const tokenAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: '0x6ea350234B6e4feb964336aaEbcFBCe586F7461B',
          symbol: 'CRWH',
          decimals: '18',
        },
      },
    })
  
    return tokenAdded
  }

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
    
  const rate = 76924
  const recive = amount ? new BigNumber(amount).multipliedBy(rate) : 0;

  return (
    <div>
      <br/>
      <div className="container">
        <div className="text-center">
        <Image
          src={logo}
          alt="logo"
        />
        <br/>          
        <h2>Welcome to the CRAZYWHALE Presale</h2>
          <h3>Presale Ends In</h3>
          <Countdown />
        </div>
        <div className='text-center'>
        <a href='https://crazywhale.tech/'><button className='btn btn-primary'>Main Page</button></a>
        </div>
        <br />
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Pool Details</h5>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Presale Rate</td>
                        <td>1 BNB = 76924 CRWH</td>
                      </tr>
                      <tr>
                        <td>Soft Cap</td>
                        <td>300 BNB</td>
                      </tr>
                      <tr>
                        <td>Hard Cap</td>
                        <td>170000 BNB</td>
                      </tr>
                      <tr>
                        <td>Minimum Buy</td>
                        <td>0.033 BNB</td>
                      </tr>
                      <tr>
                        <td>Maximum Buy</td>
                        <td>100 BNB</td>
                      </tr>
                      <tr>
                        <td>Presale Start Time</td>
                        <td>2023.06.20</td>
                      </tr>
                      <tr>
                        <td>Presale End Time</td>
                        <td>2023.07.11</td>
                      </tr>
                      <tr>
                        <td>Token Contract</td>
                        <td><a href="https://bscscan.com/address/0x6ea350234b6e4feb964336aaebcfbce586f7461b" target="_blank" rel="noreferrer">0x6ea3.....f7461b</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Join The Pool</h5>
                <br/>
                <ConnectKitButton />
                <br/>
                <span>Available Balance</span>
                <h3>{address ? `${tokenBal} CRWH` : 'Locked'}</h3>
                <br/>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{ width: `${sold}%` }} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>{sold} BNB</td>
                        <td>170000 BNB</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="form-group">
                  <label className="mr-sm-2">Enter BNB Amount</label>
                  <div className="input-group">
                    <input
                      type="number" 
                      name="amount" 
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)}
                      className="form-control" 
                      placeholder="0.000"
                    />
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <p className="mb-0">You will recive</p>
                    <h6 className="mb-0">{recive.toString()} CRWH</h6>
                  </div>
                  <br/>
                  {address ? 
                    <button
                    disabled={isLoading || !sendTransaction}
                    onClick={() => sendTransaction()}
                    className="btn btn-success btn-block">
                       {isLoading ? 'Buying...' : 'BUY NOW'}
                    </button> 
                    :
                    <button className="btn btn-primary btn-block" disabled>Please Connect wallet</button>
                  }
                  {isSuccess && (
                    toast.success('Thanks for participating in our presale!', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h3>How to Add CRWH Token in MetaMask Wallet?</h3>
          <button onClick={registerToken} className="btn btn-primary">Click Here to Add</button>
          <br/><br/>
          <h5>In order to receive the CrazyWhale token in other Wallets, please import the token in your Wallet. The contract address of the CRWH token is 0x6ea350234B6e4feb964336aaEbcFBCe586F7461B . Enter 18 decimals.</h5>
        </div>
        <br/>
        <div className="text-center">
          <h4>Note: Once your transaction is successful the smart contract will transfer CRWH to your same BNB wallet.</h4>
          <h4>Dont send directly BNB to the smart contract it will cancel the transaction.</h4>
        </div>
      </div>
      <div className="text-center">
        <a href="https://t.me/crazywhale" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faTelegram}  size="3x" style={{paddingRight: '3px'}}/>
        </a>
        <a href="https://twitter.com/crazywhale" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faTwitter}  size="3x" style={{paddingRight: '3px'}}/>
        </a>
        <a href="https://medium.com/crazywhale" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faMedium}  size="3x" style={{paddingRight: '3px'}}/>
        </a>
      </div>
      <br/>
      <div className="text-center"><h4>© Crazywhale.tech 2023. All rights reserved.</h4></div>
      <br/>
    </div>
  );
};

export default Home;
