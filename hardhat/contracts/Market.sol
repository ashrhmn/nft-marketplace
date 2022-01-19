// SPDX-License-Identifier: MIT

pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    constructor() ERC721("CurName", "CurSymbol") {}

    function mint(address owner, uint256 tokenId) public {
        _mint(owner, tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        _setTokenURI(tokenId, _tokenURI);
    }
}

contract Market {
    NFT public nft;
    address public owner;
    uint256 public commision = 100;
    uint256 index;
    uint256 soldItemIndex;

    struct MarketItem {
        uint256 id;
        //tokenId
        //nftAddress

        uint256 price;
        address creator;
        uint256 status; // 2-> onSale, 1->sold,not withdrawn 0->complete
    }

    mapping(uint256 => MarketItem) items;

    constructor() {
        nft = new NFT();
        owner = msg.sender;
        index = 0;
        soldItemIndex = 0;
    }

    function createItem(
        // uint256 id,
        string memory uri,
        uint256 price
    ) public payable {
        uint256 id = index;
        require(msg.value == commision, "User must send commision money");
        console.log(msg.value);
        nft.mint(address(this), id);
        nft.setTokenURI(id, uri);
        items[id] = MarketItem(id, price, msg.sender, 2);
        ++index;
    }

    function buy(uint256 id) public payable {
        require(items[id].status == 2, "Item is not for sell");
        // require(StringUtils.equal(items[id].status,"onSale"),"Item is not for sell");
        require(
            msg.value == items[id].price,
            "Buyer must send the price of the asset"
        );
        // payable(nft.ownerOf(id)).transfer(msg.value);
        payable(owner).transfer(commision);
        items[id].status = 1;
        nft.transferFrom(address(this), msg.sender, id);
        completeTransfer(id);
    }

    function completeTransfer(uint256 id) private {
        require(items[id].status == 1, "Amount already withdrawn");
        // require(StringUtils.equal(items[id].status,"toBeWithdrawn"),"Amount already withdrawn");
        payable(items[id].creator).transfer(priceOf(id));
        items[id].status = 0;
        ++soldItemIndex;
    }

    function ownerOf(uint256 id) public view returns (address) {
        return nft.ownerOf(id);
    }

    function priceOf(uint256 id) public view returns (uint256) {
        return items[id].price;
    }

    function getTokenUri(uint256 id) public view returns (string memory) {
        return nft.tokenURI(id);
    }

    function fetchItemsOnSell() public view returns (MarketItem[] memory) {
        MarketItem[] memory _items = new MarketItem[](index - soldItemIndex);
        uint counter = 0;
        for (uint256 i = 0; i < index; ++i) {
            if (items[i].status == 2) {
                _items[counter++] = items[i];
            }
        }
        return _items;
    }

    function fetchItemsBought() public view returns (MarketItem[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < index; ++i) {
            if (items[i].status == 0 && ownerOf(i) == msg.sender) {
                ++count;
            }
        }

        MarketItem[] memory _items = new MarketItem[](count);
        count = 0;
        for (uint256 i = 0; i < index; ++i) {
            if (items[i].status == 0 && ownerOf(i) == msg.sender) {
                _items[count++] = items[i];
            }
        }
        return _items;
    }
}
