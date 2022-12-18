// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./interfaces/IStakingPositions.sol";
import "./StakingPositions.sol";

contract StakeVault is ReentrancyGuard, Ownable {
    struct StakeAsset {
        address stakeToken;
        address positionToken;
        uint256 created;
        uint256 capacity; // set 0 for no limit
        uint256 stakedAmount; // amount already staked
        uint256 endTime; // set 0 for no end
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

    modifier onlyPositionOrOwner() {
        require(
            checkIfAddressIsPosition(msg.sender) ||
                // treasury == msg.sender ||
                owner() == msg.sender,
            "!owner"
        );
        _;
    }

    event AddDefaultAprLockOption(uint16 indexed apr, uint256 lockTime);
    event RemoveDefaultAprLockOption(
        uint256 indexed index,
        uint16 indexed apr,
        uint256 lockTime
    );
    event UpdateDefaultAprLockOption(
        uint256 indexed index,
        uint16 indexed oldApr,
        uint256 oldLockTime,
        uint16 newApr,
        uint256 newLockTime
    );

    event UpdateAssetMetadata(
        uint256 indexed _stakeId,
        uint256 _capacity,
        uint256 _endTime,
        bool _active
    );

    constructor() {
        defaultsAddAprLockOption(9000, 5 minutes);
        defaultsAddAprLockOption(9000, 1 hours);
        //   defaultsAddAprLockOption(1500, 90 days);
        // defaultsAddAprLockOption(2000, 180 days);
        defaultsAddAprLockOption(2500, 270 days);
        defaultsAddAprLockOption(3000, 360 days);
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
            _baseTokenURI
        );
        _registerAsset(_stakeToken, address(newStake), _capacity, _endTime);

        if (useDefaultLocks) {
            _addDefaultLocks(newStake);
        }
    }

    function _addDefaultLocks(StakingPositions _stakePosition) internal {
        _stakePosition.addAprLockOption(9000, 5 minutes);
        _stakePosition.addAprLockOption(9000, 1 hours);
        // _stakePosition.addAprLockOption(1500, 90 days);
        // _stakePosition.addAprLockOption(2000, 180 days);
        _stakePosition.addAprLockOption(2500, 270 days);
        _stakePosition.addAprLockOption(3000, 360 days);
    }

    function deposit(
        address _user,
        address _token,
        uint256 _amount
    ) public onlyPositionOrOwner {
        ERC20(_token).transferFrom(_user, address(this), _amount);
    }

    // TODO make this secure
    function withdraw(
        address _user,
        address _token,
        uint256 _amount
    ) public onlyPositionOrOwner {
        ERC20(_token).transferFrom(address(this), _user, _amount);
    }

    // TODO Secure this
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
                endTime: _endTime,
                active: true
            })
        );

        positionForAsset[_stakeToken] = _stakePosition;
        stakePositionId[_stakeToken] = stakeAssets.length - 1;
    }

    function updateAsset(
        uint256 _stakeId,
        uint256 _capacity,
        uint256 _endTime,
        bool _active
    ) external onlyPositionOrOwner {
        StakeAsset storage stakePosition = stakeAssets[_stakeId];
        require(stakeAssets[_stakeId].created > 0, "Stake does not exist");

        stakePosition.capacity = _capacity;
        stakePosition.endTime = _endTime;
        stakePosition.active = _active;

        // TODO add event here
        emit UpdateAssetMetadata(_stakeId, _capacity, _endTime, _active);
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
            ERC20(token).approve(spender, type(uint256).max);
        }
    }

    function defaultsGetAllLockOptions()
        external
        view
        returns (AprLockDefaults[] memory)
    {
        return _defaultAprLockOptions;
    }

    function defaultsAddAprLockOption(
        uint16 _apr,
        uint256 _lockTime
    ) public onlyOwner {
        _defaultsAddAprLockOption(_apr, _lockTime);
        emit AddDefaultAprLockOption(_apr, _lockTime);
    }

    function _defaultsAddAprLockOption(
        uint16 _apr,
        uint256 _lockTime
    ) internal {
        _defaultAprLockOptions.push(
            AprLockDefaults({apr: _apr, lockTime: _lockTime})
        );
    }

    function defaultsRemoveAprLockOption(uint256 _index) external onlyOwner {
        AprLockDefaults memory _option = _defaultAprLockOptions[_index];
        _defaultAprLockOptions[_index] = _defaultAprLockOptions[
            _defaultAprLockOptions.length - 1
        ];
        _defaultAprLockOptions.pop();
        emit RemoveDefaultAprLockOption(_index, _option.apr, _option.lockTime);
    }

    function defaultsUpdateAprLockOption(
        uint256 _index,
        uint16 _apr,
        uint256 _lockTime
    ) external onlyOwner {
        AprLockDefaults memory _option = _defaultAprLockOptions[_index];
        _defaultAprLockOptions[_index] = AprLockDefaults({
            apr: _apr,
            lockTime: _lockTime
        });
        emit UpdateDefaultAprLockOption(
            _index,
            _option.apr,
            _option.lockTime,
            _apr,
            _lockTime
        );
    }

    function governanceRecoverUnsupported(
        ERC20 _token,
        address _to
    ) external onlyOwner {
        _token.transfer(_to, _token.balanceOf(address(this)));
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
