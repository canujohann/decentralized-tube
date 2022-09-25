import ContractAbi from "../artifacts/contracts/YouTube.sol/YouTube.json";
import { ethers } from "ethers";

export default function getContract() {
  // Creating a new provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // Getting the signer
  const signer = provider.getSigner();
  // Creating a new contract factory with the signer, address and ABI
  let contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_VIDEO_PLATFORM_CONTRACT_ADRESS,
    ContractAbi.abi,
    signer
  );
  // Returning the contract
  return contract;
}
