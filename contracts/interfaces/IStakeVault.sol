// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

interface IStakeVault {
    function deposit(address _user, address _token, uint256 _amount) external;

    function registerAsset(
        address _stakeToken,
        address _stakePosition,
        uint256 _capacity,
        uint256 _endTime
    ) external;
}
