"use client";

import Image from "next/image";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState, useEffect } from "react";
import { contractAddress, abi } from "../constants/constants";
import { ethers } from "../constants/ethers-5.2.esm.min.js";

let web3Modal; // it needs a list of the providers that we want to give the user to connect to the wallet

// list of providerss
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: { 42: process.env.NEXT_PUBLIC_RPC_URL },
    },
  },
};

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function connect() {
    try {
      if (typeof window.ethereum != "undefined") {
        setIsConnected(true);
        setHasMetamask(true);
        web3Modal = new Web3Modal({
          cacheProvider: false,
          providerOptions, // required
        });
        const web3ModalProvider = await web3Modal.connect(); // request account
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        setSigner(provider.getSigner());
      } else {
        setIsConnected(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function execute() {
    if (typeof window.ethereum != "undefined") {
      const contract = new ethers.Contract(contractAddress, abi, signer); // we are going to interact with the contract address, using the abi and in the name of the signer
      try {
        const owner = await contract.getOwner();
        console.log(owner);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Install Metamask");
    }
  }

  return (
    <div>
      {hasMetamask ? (
        isConnected ? (
          "Connected! "
        ) : (
          <button onClick={() => connect()}>Connect</button>
        )
      ) : (
        "Please install metamask"
      )}

      {isConnected ? <button onClick={() => execute()}>Execute</button> : ""}
    </div>
  );
}
