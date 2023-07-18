// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Twitter is ERC721URIStorage {
    uint256 public tokenCounter;
    uint256 public postCounter;

    mapping(uint256 => Post) public posts;

    mapping (address => uint256) public profiles;

    struct Post {
        uint256 tweetId;
        string hash;
        uint256 tipAmount;
        address payable author;
    }

    event PostCreated(
        uint256 id,
        string hash,
        uint256 tipAmount,
        address payable author
    );

    event PostTipped(
        uint256 id,
        string hash,
        uint256 tipAmount,
        address payable author
    );

    constructor() ERC721("Twitter", "TWTR") {
    }

    function mintNFT(string memory _tokenURI) external returns (uint256) {
        tokenCounter++;
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, _tokenURI);
        return tokenCounter;
    }

    function setProfile(uint256 _id) public {
        require(
            
            ownerOf(_id) == msg.sender,
            "You are not the owner of this token"
        );

        profiles[msg.sender] = _id;
    }
    
    function uploadPost(string memory _postHash) external {
        require(balanceOf(msg.sender)>0 , "Must own a nft to post");

        require(bytes(_postHash).length > 0, "Hash must not be empty");

        postCounter++;

        posts[postCounter] = Post(postCounter, _postHash, 0, payable(msg.sender));

        emit PostCreated(postCounter, _postHash, 0, payable(msg.sender));

    }

    function tipPost(uint256 _id) external payable {
        require(_id>0 && _id <= postCounter, "Post does not exist");

        Post memory _post = posts[_id];

        require(_post.author != msg.sender, "You cannot tip your own post");

        _post.author.transfer(msg.value);

        _post.tipAmount += msg.value;

        posts[_id] = _post;

        emit PostTipped(_id, _post.hash, _post.tipAmount, _post.author);
    }


    function getAllPosts() external view returns(Post[] memory _posts)
    {
        _posts = new Post[](postCounter);
        for(uint256 i = 1; i <= postCounter; i++) {
            _posts[i-1] = posts[i];
        }
        return _posts;
    }

   
   function getMyNfts() external view returns(uint256[]  memory _postIds )
    {
        _postIds = new uint256[](balanceOf(msg.sender));
        uint256 currentIndex = 0 ;
        uint256 _tokenCounter = tokenCounter;

        for (uint256 i = 0; i < _tokenCounter; i++) {
            if(ownerOf(i+1) == msg.sender){
                _postIds[currentIndex] = i+1;
                currentIndex++;
            }
        }

    }
    

}
