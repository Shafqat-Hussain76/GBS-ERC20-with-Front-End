// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MYERC20 is ERC20("Ghani Business Solutions", "GBS"), Ownable{
    uint256 mintedTokens;

    function decimals() public pure override(ERC20) returns (uint8) {
        return 10;
    }

    function mint(uint _tokens) external onlyOwner() {
        require(mintedTokens + _tokens * 10 ** decimals() <= 20000000 * 10 ** decimals(), "Token Limit Exceeded");
        mintedTokens += _tokens * 10 ** decimals();
        _mint(msg.sender, _tokens * 10 ** decimals());
    }    
}
