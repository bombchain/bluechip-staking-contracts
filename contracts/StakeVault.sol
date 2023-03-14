// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./interfaces/IStakingPositions.sol";
import "./StakingPositions.sol";
import "./interfaces/IStakeVault.sol";

import "./owner/Operator.sol";

contract StakeVault is ReentrancyGuard, Operator {
    using Counters for Counters.Counter;
    using Strings for uint256;

    struct StakeAsset {
        address stakeToken;
        address positionToken;
        uint256 created;
        uint256 capacity; // set 0 for no limit
        uint256 stakedAmount; // amount already staked
        uint256 yieldEarned;
        uint256 endTime; // set 0 for no end
        uint256 deployedAmount;
        bool active;
    }

    struct AprLockDefaults {
        uint16 apr;
        uint256 lockTime;
    }

    AprLockDefaults[] internal _defaultAprLockOptions;

    StakeAsset[] public stakeAssets;

    mapping(address => address) public positionForAsset;

    mapping(address => uint256) public stakePositionId;

    Counters.Counter internal _ids;

    modifier onlyPositionOrOwner() {
        require(
            checkIfAddressIsPosition(_msgSender()) || owner() == _msgSender(),
            "!owner"
        );
        _;
    }

    event UpdateAssetMetadata(
        uint256 indexed _stakeId,
        uint256 _capacity,
        uint256 _endTime,
        bool _active
    );

    event FundsDeployed(uint256 indexed _stakeId, uint256 _amount);

    event FundsReturned(uint256 indexed _stakeId, uint256 _amount);

    event Deposit(address indexed _token, uint256 _amount);

    event Withdraw(address indexed _token, uint256 _amount);

    constructor(address _devAddress) {
        _transferOperator(_devAddress);
        _transferOwnership(_devAddress);
    }

    function deployStake(
        string memory _name,
        string memory _symbol,
        address _stakeToken,
        string memory _baseTokenURI,
        uint256 _capacity,
        uint256 _endTime,
        bool useDefaultLocks
    ) external onlyOwner {
        require(
            !checkStakeDuplicate(_stakeToken),
            "Stake already exists for this asset, please update it"
        );

        StakingPositions newStake = new StakingPositions(
            _name,
            _symbol,
            _stakeToken,
            address(this),
            _baseTokenURI,
            _capacity,
            _endTime
        );
        _registerAsset(_stakeToken, address(newStake), _capacity, _endTime);

        if (useDefaultLocks) {
            _addDefaultLocks(newStake);
        }
        newStake.transferOwnership(owner());
    }

    function _addDefaultLocks(StakingPositions _stakePosition) internal {
        _stakePosition.addAprLockOption(920, 90 days);
        _stakePosition.addAprLockOption(1490, 180 days);
        _stakePosition.addAprLockOption(2170, 270 days);
        _stakePosition.addAprLockOption(2980, 360 days);
    }

    function _deposit(
        address _user,
        address _token,
        uint256 _amount
    ) external onlyPositionOrOwner {
        uint256 stakeId = stakePositionId[_msgSender()];
        StakeAsset storage _stakeAsset = stakeAssets[stakeId];

        _stakeAsset.stakedAmount += _amount;

        emit Deposit(_token, _amount);
        require(
            ERC20(_token).transferFrom(_user, address(this), _amount),
            "Token could not be transferred"
        );
    }

    function _withdraw(
        address _user,
        address _token,
        uint256 _amount,
        uint256 _yieldEarned
    ) external onlyPositionOrOwner {
        uint256 stakeId = stakePositionId[_msgSender()];
        StakeAsset storage _stakeAsset = stakeAssets[stakeId];
        require(_stakeAsset.created > 0, "Stake does not exist");
        _stakeAsset.stakedAmount -= _amount;
        _stakeAsset.yieldEarned += _yieldEarned;

        emit Withdraw(_token, _amount + _yieldEarned);
        require(
            ERC20(_token).transfer(_user, _amount + _yieldEarned),
            "Token could not be transferred"
        );
    }

    function _registerAsset(
        address _stakeToken,
        address _stakePosition,
        uint256 _capacity,
        uint256 _endTime
    ) internal {
        stakeAssets.push(
            StakeAsset({
                stakeToken: _stakeToken,
                positionToken: _stakePosition,
                created: block.timestamp,
                capacity: _capacity,
                stakedAmount: 0,
                yieldEarned: 0,
                endTime: _endTime,
                deployedAmount: 0,
                active: true
            })
        );

        positionForAsset[_stakeToken] = _stakePosition;
    }

    function updateAsset(
        uint256 _stakeId,
        uint256 _capacity,
        uint256 _endTime,
        bool _active
    ) external onlyOwner {
        require(stakeAssets[_stakeId].created > 0, "Stake does not exist");
        StakeAsset storage stakePosition = stakeAssets[_stakeId];
        stakePosition.capacity = _capacity;
        stakePosition.endTime = _endTime;
        stakePosition.active = _active;

        emit UpdateAssetMetadata(_stakeId, _capacity, _endTime, _active);
    }

    function deployFunds(
        uint256 _stakeId,
        uint256 _amount,
        address _to
    ) external onlyOwnerOrOperator {
        require(stakeAssets[_stakeId].created > 0, "Stake does not exist");

        StakeAsset storage stakePosition = stakeAssets[_stakeId];
        stakePosition.deployedAmount += _amount;
        IERC20 _token = IERC20(stakePosition.stakeToken);

        require(
            _token.transfer(_to, _amount),
            "Token could not be transferred"
        );

        emit FundsDeployed(_stakeId, _amount);
    }

    function returnDeployedFunds(
        uint256 _stakeId,
        uint256 _amount,
        address _from
    ) external onlyOwnerOrOperator {
        require(stakeAssets[_stakeId].created > 0, "Stake does not exist");

        StakeAsset storage stakePosition = stakeAssets[_stakeId];
        IERC20 _token = IERC20(stakePosition.stakeToken);
        require(
            _token.transferFrom(_from, address(this), _amount),
            "Token could not be transferred"
        );

        stakePosition.deployedAmount -= _amount;

        emit FundsReturned(_stakeId, _amount);
    }

    function checkStakeDuplicate(address _token) internal view returns (bool) {
        uint256 length = stakeAssets.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            if (stakeAssets[pid].stakeToken == _token) {
                return true;
            }
        }
        return false;
    }

    function _approveTokenIfNeeded(address token, address spender) private {
        if (ERC20(token).allowance(address(this), spender) == 0) {
            require(
                ERC20(token).approve(spender, type(uint256).max),
                "Could not approve token"
            );
        }
    }

    function governanceRecoverUnsupported(
        ERC20 _token,
        address _to
    ) external onlyOwner {
        require(
            _token.transfer(_to, _token.balanceOf(address(this))),
            "Token could not be transferred"
        );
    }

    function checkIfAddressIsPosition(
        address _position
    ) internal view returns (bool) {
        uint256 length = stakeAssets.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            if (stakeAssets[pid].positionToken == _position) {
                return true;
            }
        }
        return false;
    }
}
