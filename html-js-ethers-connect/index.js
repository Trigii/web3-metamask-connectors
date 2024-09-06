import { ethers } from "./ethers-5.2.esm.min.js";

const connectButton = document.getElementById("connectButton");
const ownerButton = document.getElementById("ownerButton");

connectButton.onclick = connect;
ownerButton.onclick = getOwner;

async function connect() {
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" }); // promt the user with metamask wallet connection
  } catch (error) {
    console.log(error);
  }
}

async function getOwner() {
  // we need the contract address + contract ABI + function + node connection
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const abi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "priceFeedAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "FundMe__NotOwner",
      type: "error",
    },
    {
      stateMutability: "payable",
      type: "fallback",
    },
    {
      inputs: [],
      name: "MINIMUM_USD",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "cheaperWithdraw",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "fund",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "funder",
          type: "address",
        },
      ],
      name: "getAddressToAmountFunded",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "getFunder",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getOwner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getPriceFeed",
      outputs: [
        {
          internalType: "contract AggregatorV3Interface",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getVersion",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ];

  const provider = new ethers.providers.Web3Provider(window.ethereum); // rpc url metamask is connected
  const signer = provider.getSigner(); // this gets the connected account (the one who does the transactions through the frontend -> account connected)
  const contract = new ethers.Contract(contractAddress, abi, signer); // we are going to interact with the contract address, using the abi and in the name of the signer
  const owner = await contract.getOwner();
  console.log(owner);
}

module.exports = {
  connect,
  execute,
};
