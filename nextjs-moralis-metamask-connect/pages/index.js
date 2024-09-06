"use client"; // top to the file

import Image from "next/image";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { contractAddress, abi } from "../constants/constants";

export default function Home() {
  const { enableWeb3, isWeb3Enabled } = useMoralis(); // hook for connecting to the wallet (isWeb3Enabled checks if the user is connected and enableWeb3 is the connect function)
  // moralis also provides a way to execute contract functions:
  const { runContractFunction } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "getOwner",
    /*
    params: {
      name: value,
      ...
    }
      */
  });

  return (
    <div>
      Hello Tristán!
      {isWeb3Enabled ? (
        <>
          "Connected!"
          <button onClick={() => console.log(runContractFunction())}>
            Execute
          </button>
        </>
      ) : (
        <button onClick={() => enableWeb3()}>Connect</button>
      )}
    </div>
  );
}
