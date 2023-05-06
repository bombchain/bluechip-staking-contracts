// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IStakeVault {
    function _deposit(address _user, address _token, uint256 _amount) external;

    function _withdraw(
        address _user,
        address _token,
        uint256 _amount,
        uint256 _yieldEarned
    ) external;

    function _updateUserBonus(
        address _user,
        address _token,
        uint256 _bonusAmount,
        uint256 _bonusCreated,
        uint256 _stakingDeposits,
        bool _referralBonus
    ) external;

    function admin() external view returns (address);

    function usersBonus(
        address
    ) external view returns (address, uint256, uint256, uint256, bool);

    function stakePositionData(
        address
    )
        external
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            bool
        );
}
