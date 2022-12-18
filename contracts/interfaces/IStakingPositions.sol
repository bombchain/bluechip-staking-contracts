// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

interface IStakingPositions {
    function getStakeToken() external returns (address);

    function addAprLockOption(uint16 _apr, uint256 _lockTime) external;

    function stake(
        address _user,
        uint256 _amount,
        uint256 _lockOptIndex
    ) external;
}
