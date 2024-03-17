// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract RodruxRocks is ERC721, ERC721Enumerable {
  uint256 public maxSupply;


   constructor(uint256 _maxSupply) ERC721("RodruxRocks", "RXRKS") {
    maxSupply = _maxSupply;
   }

    function mint() public{
      uint256 counter = totalSupply();
      require(counter < maxSupply, "No more RodruxRocks available");
      _safeMint(msg.sender, counter);
    }
    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
