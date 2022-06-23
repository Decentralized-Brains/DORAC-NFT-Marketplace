// // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DogNFT is ERC721URIStorage {
    uint256 public tokenCounter; // count for each NFT
    mapping(uint256 => dog) public NFTList;
    struct dog {
        address creator;
        uint256 mintingTime;
        string TIER;
        string BREED_COUNT;
        string AGILITY;
        string WEIGHT;
        string STAMINA;
        string HEALTH;
        string LUCK;
        string TOKENURI;
    }

    /// @notice constructor function will pass collection name and symbol to the parent contract that we have inherited from openzeppelin
    constructor() ERC721("Dog Collection", "DOG") {
        tokenCounter = 0;
    }

    /// @notice An aritst can mint their NFT using this function
    function createCollectible(
        string memory _tokenURI,
        string memory _TIER,
        string memory _BREED_COUNT,
        string memory _AGILITY,
        string memory _WEIGHT,
        string memory _STAMINA,
        string memory _HEALTH,
        string memory _LUCK
    ) public returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        NFTList[newTokenId] = dog(
            tx.origin,
            block.timestamp,
            _TIER,
            _BREED_COUNT,
            _AGILITY,
            _WEIGHT,
            _STAMINA,
            _HEALTH,
            _LUCK,
            _tokenURI
        );
        tokenCounter = tokenCounter + 1;
        return newTokenId;
    }

    function getCreator(uint256 _id) external view returns (address) {
        return address(NFTList[_id].creator);
    }
}
