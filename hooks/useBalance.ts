import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { useAccount, useConnect, useEnsName } from 'wagmi'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import erc20Abi from '../abi/erc20.json';
import presaleAbi from '../abi/abis.json';


const web3 = new Web3(Web3.givenProvider || "https://bsc-dataseed.binance.org");
const tokenAdd = '0x6ea350234B6e4feb964336aaEbcFBCe586F7461B';
const tokenContract = new web3.eth.Contract(erc20Abi as AbiItem[], tokenAdd);
const contractAddr = '0x4aC72735cC32C8bef3331EcDC155f92672B83F12';
const presaleContract = new web3.eth.Contract(presaleAbi as AbiItem[], contractAddr);

export const useTokenBalance = () => {
  const [balance, setBalance] = useState('')
  const { address } = useAccount()

  const fetchBalance = async () => {
    const result = await tokenContract.methods.balanceOf(address).call();
    const balance = new BigNumber(result).dividedBy(new BigNumber(10).pow(18)).toFixed();
    setBalance(balance);
  }

  useEffect(() => {
      if (address) {
        fetchBalance()
      }
  }, [address])

  return balance
}

export const useSoldAmount = () => {
  const [sold, setSold] = useState('')

  const fetchBalance = async () => {
    const result = await presaleContract.methods.totalSoldBNB().call();
    const sold = new BigNumber(result).dividedBy(new BigNumber(10).pow(18)).toFixed();
    setSold(sold);
  }

  useEffect(() => {
    fetchBalance()
  }, [])

  return sold
}

