// File contracts/interfaces/IWETH.sol
// License-Identifier: MIT

interface IWETH {
    function deposit() external payable;

    function withdraw(uint256) external;
}
