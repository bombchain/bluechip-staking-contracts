// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

interface IStakeVault {
    function _deposit(address _user, address _token, uint256 _amount) external;

    function _withdraw(
        address _user,
        address _token,
        uint256 _amount,
        uint256 _yieldEarned
    ) external;

    function owner() external view returns (address);
}
