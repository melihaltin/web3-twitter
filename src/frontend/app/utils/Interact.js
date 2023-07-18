require("dotenv").config();
// const alchemyKey = process.env.ALCHEMY_WEB_SOCKET;
import { create as ipfsHttpClient } from "ipfs-http-client";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
const alchemyKey =
  "wss://polygon-mumbai.g.alchemy.com/v2/o70WgwVDF8R-KdWEfMfEMeA_O23jEEd_";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require("../../../contract/twitter-artifacts.json").abi;
const contractAddressJson = require("../../../contract/twitter-address.json");
const contractAddress = contractAddressJson.Twitter;

export const contract = new web3.eth.Contract(contractABI, contractAddress);

export const loadCurrentMessage = async () => {
  const message = await contract.methods.getAllPosts().call();
  return message;
};

export const connectWallet = async () => {
  let obj = {
    address: "",
    isConnected: false,
  };
  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please Install Metamask");
      return obj;
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts === null || accounts === undefined) {
      alert("You do not have any accounts connected to your MetaMask wallet.");
      return obj;
    }

    obj.address = accounts[0];
    obj.isConnected = true;
    return obj;
  } catch (error) {
    console.error(error);
    return obj;
  }
};

export const loadPosts = async () => {
  let address = (await connectWallet()).address;

  const balance = await contract.methods.balanceOf(address).call();

  let results = await contract.methods.getAllPosts().call();

  let posts = await Promise.all(
    results.map(async (i) => {
      // use hash to fetch the post's metadata stored on ipfs
      let response = await fetch(`https://ipfs.infura.io/ipfs/${i.hash}`);
      const metadataPost = await response.json();
      // get authors nft profile
      const nftId = await contract.methods.profiles(i.author).call();
      // get uri url of nft profile
      const uri = await contract.methods().tokenURI(nftId);
      console.log("uri", uri);
      // fetch nft profile metadata
      response = await fetch(uri);
      const metadataProfile = await response.json();
      // define author object
      const author = {
        address: i.author,
        username: metadataProfile.username,
        avatar: metadataProfile.avatar,
      };
      // define post object
      let post = {
        id: i.id,
        content: metadataPost.post,
        tipAmount: i.tipAmount,
        author,
      };
      return post;
    })
  );
};

export const uploadPost = async (post) => {
  if (!post) return;
  let hash;
  // Upload post to IPFS
  try {
    const result = await client.add(JSON.stringify({ post }));
    hash = result.path;
  } catch (error) {
    window.alert("ipfs image upload error: ", error);
  }

  // upload post to blockchain
  await (await contract.methods.uploadPost(hash).call()).wait();
  // loadPosts();
};

// export const updateMessage = async (message) => {};
