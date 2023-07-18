"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { list } from "postcss";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState({});

  const router = useRouter();

  const { ethereum } = window;
  if (ethereum) {
    var provider = new ethers.BrowserProvider(ethereum);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isMetaMaskConnected = async () => {
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
  };

  useEffect(() => {
    isMetaMaskConnected()
      .then((connected) => {
        if (connected) {
          // metamask is connected
          console.log("metamask is connected");
          router.push("/home");
        } else {
          // metamask is not connected
          console.log("metamask is not connected");
          router.push("/login");
        }
      })
      .catch((error) => {
        // Hata yönetimi
      });
  }, [isMetaMaskConnected, router]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      SPLASH
    </main>
  );
}
