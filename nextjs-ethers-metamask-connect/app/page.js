"use client"; // This is a client component

import Image from "next/image";
import { useState } from "react";
import { contractAddress, abi } from "../constants/constants";
// import { ethers } from "ethers";
import { ethers } from "../constants/ethers-5.2.esm.min.js";

// 1. Connect to metamask
// 2. Call a function
export default function Home() {
  const [isConnected, setIsConnected] = useState(false); // to keep state between renders
  const [signer, setSigner] = useState(undefined);

  async function connect() {
    if (typeof window.ethereum != "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        let provider = await new ethers.providers.Web3Provider(window.ethereum);
        setSigner(await provider.getSigner());
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function execute() {
    if (typeof window.ethereum != "undefined") {
      // we need the contract address + contract ABI + function + node connection

      const contract = new ethers.Contract(contractAddress, abi, signer); // we are going to interact with the contract address, using the abi and in the name of the signer
      try {
        const owner = await contract.getOwner();
        console.log(owner);
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsConnected(false);
    }
  }

  return (
    <div>
      Hello Tristán!
      {isConnected ? (
        <>
          "Connected!"
          <button onClick={() => execute()}>Execute</button>
        </>
      ) : (
        <button onClick={() => connect()}>Connect</button>
      )}
    </div>
  );
}
