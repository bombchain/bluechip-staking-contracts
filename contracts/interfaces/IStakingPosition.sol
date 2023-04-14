// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

interface IStakingPosition {
    function getStakeToken() external returns (address);

    function initialize(
        string memory _name,
        string memory _symbol,
        address _stakeToken,
        string memory _baseTokenURI,
        uint256 _capacity,
        uint256 _endTime
    ) external;

    function addAprLockOption(uint16 _apr, uint256 _lockTime) external;

    function stake(
        address _user,
        uint256 _amount,
        uint256 _lockOptIndex
    ) external;
}
