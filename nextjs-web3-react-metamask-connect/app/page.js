"use client"; // This is a client component

import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { contractAddress, abi } from "../constants/constants";
import { ethers } from "../constants/ethers-5.2.esm.min.js";

const injected = new InjectedConnector();

export default function Home() {
  const { activate, active, library: provider } = useWeb3React(); // library (renamed to provider); active is to check if we are actively connected to the waller or not (we can use this accross different pages)

  async function connect() {
    try {
      await activate(injected); // connect to the injected provider
    } catch (error) {
      console.log(error);
    }
  }

  async function execute() {
    if (active) {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer); // we are going to interact with the contract address, using the abi and in the name of the signer
      try {
        const owner = await contract.getOwner();
        console.log(owner);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      Hello Tristán!
      {active ? (
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
