const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Twitter", function () {
  let twitter;
  let deployer, user1, user2, users;
  let URI = "SampleURI";
  let postHash = "SampleHash";
  beforeEach(async () => {
    // Get signers from development accounts
    [deployer, user1, user2, ...users] = await ethers.getSigners();
    // We get the contract factory to deploy the contract
    twitter = await ethers.deployContract("Twitter");
    // user1 mints an nfts
    await twitter.connect(user1).mintNFT(URI);
  });
  describe("Deployment", async () => {
    it("Should track name and symbol", async function () {
      const nftName = "Twitter";
      const nftSymbol = "TWTR";
      expect(await twitter.name()).to.equal(nftName);
      expect(await twitter.symbol()).to.equal(nftSymbol);
    });
  });
  describe("Minting NFTs", async () => {
    it("Should track each minted NFT", async function () {
      expect(await twitter.tokenCounter()).to.equal(1);
      expect(await twitter.balanceOf(user1.address)).to.equal(1);
      expect(await twitter.tokenURI(1)).to.equal(URI);
      // user2 mints an nft
      await twitter.connect(user2).mintNFT(URI);
      expect(await twitter.tokenCounter()).to.equal(2);
      expect(await twitter.balanceOf(user2.address)).to.equal(1);
      expect(await twitter.tokenURI(2)).to.equal(URI);
    });
  });
  describe("Setting profiles", async () => {
    it("Should allow users to select which NFT they own to represent their profile", async function () {
      await twitter.connect(user1).setProfile(1);
      expect(await twitter.profiles(user1.address)).to.equal(1);
      // FAIL CASE //
      // user 2 tries to set their profile to nft number 2 owned by user 1
      //   await expect(twitter.connect(user2).setProfile(2)).to.be.revertedWith(
      //     "You are not the owner of this token"
      //   );
    });
  });
  describe("Uploading posts", async () => {
    it("Should track posts uploaded only by users who own an NFT", async function () {
      // user1 uploads a post
      await expect(twitter.connect(user1).uploadPost(postHash))
        .to.emit(twitter, "PostCreated")
        .withArgs(1, postHash, 0, user1.address);
      const postCounter = await twitter.postCounter();
      expect(postCounter).to.equal(1);
      // Check from struct
      const post = await twitter.posts(postCounter);
      expect(post.tweetId).to.equal(1);
      expect(post.hash).to.equal(postHash);
      expect(post.tipAmount).to.equal(0);
      expect(post.author).to.equal(user1.address);
      // FAIL CASE #1 //
      // user 2 tried to upload a post without owning an nft
      await expect(
        twitter.connect(user2).uploadPost(postHash)
      ).to.be.revertedWith("Must own a nft to post");
      // FAIL CASE #2 //
      // user 1 tried to upload a post with an empty post hash.
      await expect(twitter.connect(user1).uploadPost("")).to.be.revertedWith(
        "Hash must not be empty"
      );
    });
  });
  describe("Tipping posts", async () => {
    it("Should allow users to tip posts and track each posts tip amount", async function () {
      // user1 uploads a post
      await twitter.connect(user1).uploadPost(postHash);
      // Track user1 balance before their post gets tipped
      const initAuthorBalance = await ethers.provider.getBalance(user1.address);
      // Set tip amount to 1 ether
      const tipAmount = ethers.parseEther("1");
      // user2 tips user1's post
      await expect(twitter.connect(user2).tipPost(1, { value: tipAmount }))
        .to.emit(twitter, "PostTipped")
        .withArgs(1, postHash, tipAmount, user1.address);
      // Check that tipAmount has been updated from struct
      const post = await twitter.posts(1);
      expect(post.tipAmount).to.equal(tipAmount);
      // Check that user1 received funds
      const finalAuthorBalance = await ethers.provider.getBalance(
        user1.address
      );
      expect(finalAuthorBalance).to.equal(initAuthorBalance + tipAmount);
      // FAIL CASE #1 //
      // user 2 tries to tip a post that does not exist
      await expect(twitter.connect(user2).tipPost(2)).to.be.revertedWith(
        "Post does not exist"
      );
      // FAIL CASE #2 //
      // user 1 tries to tip their own post
      await expect(twitter.connect(user1).tipPost(1)).to.be.revertedWith(
        "You cannot tip your own post"
      );
    });
  });
  describe("Getter functions", function () {
    beforeEach(async function () {
      // user 1 makes a post
      await twitter.connect(user1).uploadPost(postHash);
      // user 1 mints another NFT
      await twitter.connect(user1).mintNFT(URI);
      // user 2 mints an NFT
      await twitter.connect(user2).mintNFT(URI);
      // user 2 makes a post
      await twitter.connect(user2).uploadPost(postHash);
    });

    it("getAllPosts should fetch all the posts", async function () {
      const allPosts = await twitter.getAllPosts();
      // Check that the length is correct
      expect(allPosts.length).to.equal(2);
    });
    it("getMyNfts should fetch all nfts the user owns", async function () {
      const user1Nfts = await twitter.connect(user1).getMyNfts();
      expect(user1Nfts.length).to.equal(2);
      const user2Nfts = await twitter.connect(user2).getMyNfts();
      expect(user2Nfts.length).to.equal(1);
    });
  });
});
