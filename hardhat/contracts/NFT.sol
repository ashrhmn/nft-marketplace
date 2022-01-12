// SPDX-License-Identifier: MIT

pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter _nftId;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("MyNFTmarket", "MNM") {
        contractAddress = marketplaceAddress;
    }

    function createNft(string memory uri) public returns (uint256) {
        _nftId.increment();
        uint256 id = _nftId.current();
        _mint(msg.sender, id);
        _setTokenURI(id, uri);
        setApprovalForAll(contractAddress, true);
        return id;
    }
}
