// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;
import "@openzeppelin/contracts/utils/Counters.sol";

// NFT
interface IERC721 {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );
    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );
    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );

    function balanceOf(address owner) external view returns (uint256 balance);

    function ownerOf(uint256 tokenId) external view returns (address owner);

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function approve(address to, uint256 tokenId) external;

    function getApproved(uint256 tokenId)
        external
        view
        returns (address operator);

    function setApprovalForAll(address operator, bool _approved) external;

    function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool);

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;

    function getCreator(uint256 _id) external view returns (address);
}


interface MistryBox{
    function burn(address _owner, uint256 _id, uint256 _value) external;
}
contract NFTMarket {
    using Counters for Counters.Counter;
    address public marketOwner; // owner address
    uint256 public marketPercentage;
    mapping(uint256 => marketItem) public marketItemsList; // list of all market item
    Counters.Counter public marketItemCounter; // List of market item counter
    mapping(address => uint256) private listOfNFTContracts;
    uint256 public royalty_fee;
    address public mistryBoxContractAddress;

    enum status {
        ACTIVE,
        SOLD,
        REMOVED
    }

    // strict for the market item
    struct marketItem {
        uint256 id;
        address creator;
        uint256 tokenID;
        address NFTaddress;
        uint256 price;
        address owner;
        status currentStatus;
    }

    modifier onlyOwner() {
        require(msg.sender == marketOwner, "Not an owner");
        _;
    }

    constructor(uint256 _marketPercentage, uint256 _royalty_fee) public {
        marketOwner = msg.sender;
        marketPercentage = _marketPercentage;
        royalty_fee = _royalty_fee;
    }

    // owner functions
    function changeOwnerPercentage(uint256 newPercent) external onlyOwner {
        marketPercentage = newPercent;
    }

    function changeRoyaltyFee(uint256 newPercent) external onlyOwner {
        royalty_fee = newPercent;
    }
    function setMistryBoxContractAddress(address _new) public onlyOwner {
        mistryBoxContractAddress = _new;
    }

    function changeOwnership(address _newOwnership) external onlyOwner {
        marketOwner = _newOwnership;
    }

    function withdrawFunds() external onlyOwner {
        payable(marketOwner).transfer(address(this).balance);
    }
    
    function totalFunds() external onlyOwner view returns(uint256)  {
        return address(this).balance;
    }
    
    // event 
    event MarketItemSale(
        uint256 indexed tokenID,
        address indexed buyer,
        uint256 price
    );
    event AddMarketItem(
        uint256 indexed id,
        address indexed creator,
        uint256 tokenID,
        address NFTaddress,
        uint256 price,
        address indexed owner
    );

    event ChangeOwnership(uint256 _itemId, address newOwner, address oldOwner);

    

    ///@notice this function can be used to add new market item
    function addMarketItem(
        uint256 _tokenID,
        address _NFTaddress,
        uint256 _price
    ) external returns (uint256) {
        require(
            IERC721(_NFTaddress).ownerOf(_tokenID) == msg.sender,
            "Sender is not the NFT owner!!"
        );

        address _owner = msg.sender;

        if (listOfNFTContracts[_NFTaddress] == 0) {
            listOfNFTContracts[_NFTaddress] = 1;
        }

        //IERC721(_NFTaddress).transferFrom(_owner, address(this), _tokenID);

        uint256 currentItemIndex = marketItemCounter.current();
        address creatorAddress = IERC721(address(_NFTaddress)).getCreator(
            _tokenID
        );
        marketItemsList[currentItemIndex] = marketItem(
            currentItemIndex,
            creatorAddress,
            _tokenID,
            _NFTaddress,
            _price,
            _owner,
            status.ACTIVE
        );
        marketItemCounter.increment();

        emit AddMarketItem(
            _tokenID,
            creatorAddress,
            _tokenID,
            _NFTaddress,
            _price,
            _owner
        );
        //emit ChangeOwnership(_tokenID, address(this), _owner);
        return currentItemIndex;
    }

    function transferNFT(
        uint256 _tokenId,
        address _NFTaddress,
        address owner
    ) private {
        IERC721(_NFTaddress).transferFrom(owner, tx.origin, _tokenId);
        emit ChangeOwnership(_tokenId, tx.origin, address(this));
    }

    ///@notice sell market item
    function sellMarketItem(uint256 _itemId) external payable {
        require(
            msg.value == marketItemsList[_itemId].price,
            "Not Enough Amount Sent"
        );

        if (marketItemsList[_itemId].owner == marketOwner) {
            payable(marketItemsList[_itemId].owner).transfer(
                marketItemsList[_itemId].price
            );
        } else {
            uint256 multipliedAmountForOwner = marketItemsList[_itemId].price *
                marketPercentage;
            uint256 commisonOfMarket = multipliedAmountForOwner / 100;

            uint256 multipliedAmountForCreator = marketItemsList[_itemId]
                .price * royalty_fee;
            uint256 commisonOfCreator = multipliedAmountForCreator / 100;

            uint256 sellerAmount = marketItemsList[_itemId].price -
                commisonOfMarket -
                commisonOfCreator;

            payable(marketOwner).transfer(commisonOfMarket);
            payable(marketItemsList[_itemId].creator).transfer(
                commisonOfCreator
            );
            payable(marketItemsList[_itemId].owner).transfer(sellerAmount);
        }
        transferNFT(
            marketItemsList[_itemId].tokenID,
            marketItemsList[_itemId].NFTaddress,
            marketItemsList[_itemId].owner
        );
        marketItemsList[_itemId].owner = msg.sender;
        marketItemsList[_itemId].currentStatus = status.SOLD;

        emit ChangeOwnership(_itemId, msg.sender, marketOwner);
        emit MarketItemSale(_itemId, msg.sender, msg.value);
    }

    ///@notice owner can transfer the amount directly to other wallet
    function giftNFT(uint256 _itemId, address _to) public {
        require(
            msg.sender == marketItemsList[_itemId].owner,
            "only owner can transfer nft"
        );
        marketItemsList[_itemId].owner = _to;
        transferNFT(
            marketItemsList[_itemId].tokenID,
            marketItemsList[_itemId].NFTaddress,
            marketItemsList[_itemId].owner
        );
        emit ChangeOwnership(_itemId, _to, msg.sender);
    }

    ///@notice item owner can remove market item
    function removeMarketItem(uint256 _itemId) public {
        require(
            msg.sender == marketItemsList[_itemId].owner,
            "Not valid owner"
        );
        marketItemsList[_itemId].currentStatus = status.REMOVED;
    }

    //@notice mistryBox owner can burn mistryBox
    function burnMistryBox(address _owner, uint256 _id, uint256 _value) public {
        MistryBox(mistryBoxContractAddress).burn(_owner, _id,_value);
    }
}
