"use client";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, createContext } from "react";
const contractABI = require("../../../../contract/twitter-artifacts.json");
const contractAddressJson = require("../../../../contract/twitter-address.json");
import { connectWallet } from "../../utils/Interact";

export const ContractContext = createContext("");
const Page = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    connectWallet().then((object) => {
      setIsWalletConnected(object.isConnected);
      if (isWalletConnected) {
        router.push("/home");
      }
    });
  }, [isWalletConnected, router]);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setIsWalletConnected(walletResponse.isConnected);
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-8">
      <div className="flex flex-row gap-5">
        <div className="text-9xl text-white">WEB 3.0</div>
        <div className="text-9xl text-blue-600">Twitter</div>
      </div>
      <button
        onClick={connectWalletPressed}
        className="bg-gradient-to-r text-3xl from-red-500 to-blue-500  w-96 h-28 rounded-3xl"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default Page;
