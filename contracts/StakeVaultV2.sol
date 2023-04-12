// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./interfaces/IStakingPosition.sol";
import "./interfaces/IStakeVault.sol";

import "./owner/Operator.sol";

contract StakeVaultV2 is
    Initializable,
    PausableUpgradeable,
    AccessControlEnumerableUpgradeable,
    ReentrancyGuardUpgradeable
{
    using IERC20Upgradeable for IERC20;

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

    mapping(address => bool) public allowedMasterContracts;

    mapping(address => address) public masterContractOf;

    AprLockDefaults[] internal _defaultAprLockOptions;

    StakeAsset[] public stakeAssets;

    mapping(address => address) public positionForAsset;

    mapping(address => uint256) public stakePositionId;

    address public admin;

    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    // TODO fix these to use access control
    modifier onlyPositionOrOwner() {
        require(checkIfAddressIsPosition(_msgSender()), "!owner");
        _;
    }

    modifier onlyOwner() {
        require(checkIfAddressIsPosition(_msgSender()), "!owner");
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

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _admin) public initializer {
        __AccessControl_init();
        __ReentrancyGuard_init();
        __Pausable_init();

        admin = _admin;
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);

        _grantRole(OPERATOR_ROLE, _admin);
    }

    function allowMasterContract(
        address masterContract,
        bool approved
    ) public onlyOwner {
        // Checks
        require(masterContract != address(0), "Cannot add contract address 0");

        // Effects
        allowedMasterContracts[masterContract] = approved;
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

        // address clone = ClonesUpgradeable.clone(stakeMasterContract);
        // IStakingPosition(clone).initialize(
        //     _name,
        //     _symbol,
        //     _stakeToken,
        //     address(this),
        //     _baseTokenURI,
        //     _capacity,
        //     _endTime
        // );

        // _registerAsset(_stakeToken, address(newStake), _capacity, _endTime);

        // if (useDefaultLocks) {
        //     _addDefaultLocks(newStake);
        // }
        // newStake.transferOwnership(admin);
    }

    // function deployStake(
    //     string memory _name,
    //     string memory _symbol,
    //     address _stakeToken,
    //     string memory _baseTokenURI,
    //     uint256 _capacity,
    //     uint256 _endTime,
    //     bool useDefaultLocks
    // ) external onlyOwner {
    //     require(
    //         !checkStakeDuplicate(_stakeToken),
    //         "Stake already exists for this asset, please update it"
    //     );

    //     StakingPositions newStake = new StakingPositions(
    //         _name,
    //         _symbol,
    //         _stakeToken,
    //         address(this),
    //         _baseTokenURI,
    //         _capacity,
    //         _endTime
    //     );
    //     _registerAsset(_stakeToken, address(newStake), _capacity, _endTime);

    //     if (useDefaultLocks) {
    //         _addDefaultLocks(newStake);
    //     }
    //     newStake.transferOwnership(admin);
    // }

    function _addDefaultLocks(address _stakePosition) internal {
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
            IERC20(_token).transferFrom(_user, address(this), _amount),
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
            IERC20(_token).transfer(_user, _amount + _yieldEarned),
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
    ) external onlyOwner {
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
    ) external onlyOwner {
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
        if (IERC20(token).allowance(address(this), spender) == 0) {
            require(
                IERC20(token).approve(spender, type(uint256).max),
                "Could not approve token"
            );
        }
    }

    function governanceRecoverUnsupported(
        IERC20 _token,
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
