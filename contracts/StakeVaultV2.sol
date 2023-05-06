// SPDX-License-Identifier: MIT
pragma solidity >=0.8.17;

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
    // using IERC20Upgradeable for IERC20;

    struct StakeAsset {
        uint256 created;
        uint256 capacity; // set 0 for no limit
        uint256 stakedAmount; // amount already staked
        uint256 yieldEarned;
        uint256 endTime; // set 0 for no end
        uint256 deployedAmount;
        uint256 bonusMax; // maximum amount of bonus allowed, should be ~$1000
        bool active;
    }

    struct UserBonusData {
        IERC20 bonusToken; // Token chosen by user for initial bonus
        uint256 bonusAmount; // amount provided for bonus
        uint256 bonusCreated; // timestamp of the bonus
        uint256 stakingDeposits; // Amount of deposits towards releasing stake
        bool referralBonus; // Has the user received a referral bonus
    }

    struct AprLockDefaults {
        uint16 apr;
        uint256 lockTime;
    }

    mapping(address => bool) public allowedMasterContracts;

    mapping(address => address) public masterContractOf;

    AprLockDefaults[] internal _defaultAprLockOptions;

    mapping(IERC20 => IStakingPosition) public stakePosition;
    mapping(IERC20 => StakeAsset) public stakePositionData;

    // StakeAsset[] public stakeAssets;

    mapping(IStakingPosition => IERC20) public allStakePositions;

    address public admin;

    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    mapping(address => UserBonusData) public usersBonus;

    //  these to use access control
    modifier onlyPositionOrOwner() {
        require(
            checkIfAddressIsPosition(IStakingPosition(_msgSender())),
            "!owner"
        );
        _;
    }

    modifier onlyOwner(address _address) {
        require(_address == admin, "!owner");
        _;
    }

    event UpdateAssetMetadata(
        IERC20 indexed _stakeToken,
        uint256 _capacity,
        uint256 _endTime,
        uint256 _bonusMax,
        bool _active
    );

    event FundsDeployed(
        IERC20 indexed _stakeToken,
        address _user,
        uint256 _amount
    );

    event FundsReturned(
        IERC20 indexed _stakeToken,
        address _user,
        uint256 _amount
    );

    event Deposit(IERC20 indexed _token, address _user, uint256 _amount);

    event Withdraw(IERC20 indexed _token, address _user, uint256 _amount);

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
    ) public onlyOwner(_msgSender()) {
        // Checks
        require(masterContract != address(0), "Cannot add contract address 0");

        // Effects
        allowedMasterContracts[masterContract] = approved;
    }

    function deployStake(
        address _masterContract,
        string memory _name,
        string memory _symbol,
        IERC20 _stakeToken,
        string memory _baseTokenURI,
        uint256 _capacity,
        uint256 _endTime,
        uint256 _bonusMax,
        uint256 _referralBonusAmount,
        uint256 _referralMinAmount,
        uint16[] memory _aprAmounts
    ) external onlyOwner(_msgSender()) {
        require(
            allowedMasterContracts[_masterContract],
            "Contract has not been allowed"
        );

        // require(
        //     !checkStakeDuplicate(_stakeToken),
        //     "Stake already exists for this asset, please update it"
        // );

        address clone = ClonesUpgradeable.clone(_masterContract);
        IStakingPosition(clone).initialize(
            _name,
            _symbol,
            address(_stakeToken),
            _baseTokenURI,
            _referralBonusAmount,
            _referralMinAmount
        );

        _registerAsset(IERC20(_stakeToken), _bonusMax, _capacity, _endTime);
        stakePosition[_stakeToken] = IStakingPosition(clone);
        allStakePositions[IStakingPosition(clone)] = _stakeToken;

        masterContractOf[clone] = _masterContract;

        uint256 length = _aprAmounts.length;
        if (length > 0) {
            for (uint256 pid = 0; pid < length; ++pid) {
                stakePosition[_stakeToken].addAprLockOption(
                    _aprAmounts[pid],
                    (pid + 1) * 7776000 // adds APRs in 3 month increments
                );
            }
        }
    }

    function _updateUserBonus(
        address _user,
        IERC20 _token,
        uint256 _bonusAmount,
        uint256 _bonusCreated,
        uint256 _stakingDeposits,
        bool _referralBonus
    ) external onlyPositionOrOwner {
        usersBonus[_user].bonusToken = _token;
        usersBonus[_user].bonusAmount = _bonusAmount;
        usersBonus[_user].bonusCreated = _bonusCreated;
        usersBonus[_user].stakingDeposits = _stakingDeposits;
        usersBonus[_user].referralBonus = _referralBonus;
    }

    function _deposit(
        address _user,
        IERC20 _token,
        uint256 _amount
    ) external onlyPositionOrOwner {
        // uint256 stakeId = stakePositionId[_msgSender()];
        StakeAsset storage _stakePosition = stakePositionData[_token];

        _stakePosition.stakedAmount += _amount;

        require(
            IERC20(_token).transferFrom(_user, address(this), _amount),
            "Token could not be transferred"
        );

        emit Deposit(_token, _user, _amount);
    }

    function _withdraw(
        address _user,
        IERC20 _token,
        uint256 _amount,
        uint256 _yieldEarned
    ) external onlyPositionOrOwner {
        // uint256 stakeId = stakePositionId[_msgSender()];
        StakeAsset storage _stakePosition = stakePositionData[_token];
        require(_stakePosition.created > 0, "Stake does not exist");
        _stakePosition.stakedAmount -= _amount;
        _stakePosition.yieldEarned += _yieldEarned;

        emit Withdraw(_token, _user, _amount + _yieldEarned);
        require(
            IERC20(_token).transfer(_user, _amount + _yieldEarned),
            "Token could not be transferred"
        );
    }

    function _registerAsset(
        IERC20 _stakeToken,
        uint256 _bonusMax,
        uint256 _capacity,
        uint256 _endTime
    ) internal {
        stakePositionData[_stakeToken] = (
            StakeAsset({
                created: block.timestamp,
                capacity: _capacity,
                stakedAmount: 0,
                yieldEarned: 0,
                endTime: _endTime,
                deployedAmount: 0,
                bonusMax: _bonusMax,
                active: true
            })
        );
    }

    function updateAsset(
        IERC20 _stakeToken,
        uint256 _capacity,
        uint256 _endTime,
        uint256 _bonusMax,
        bool _active
    ) external onlyOwner(_msgSender()) {
        require(
            stakePositionData[_stakeToken].created > 0,
            "Stake does not exist"
        );
        StakeAsset storage _stakePosition = stakePositionData[_stakeToken];
        _stakePosition.capacity = _capacity;
        _stakePosition.endTime = _endTime;
        _stakePosition.active = _active;
        _stakePosition.bonusMax = _bonusMax;

        emit UpdateAssetMetadata(
            _stakeToken,
            _capacity,
            _endTime,
            _bonusMax,
            _active
        );
    }

    function deployFunds(
        IERC20 _token,
        uint256 _amount,
        address _to
    ) external onlyOwner(_msgSender()) {
        require(stakePositionData[_token].created > 0, "Stake does not exist");

        StakeAsset storage _stakePosition = stakePositionData[_token];
        _stakePosition.deployedAmount += _amount;

        require(
            _token.transfer(_to, _amount),
            "Token could not be transferred"
        );

        emit FundsDeployed(_token, _to, _amount);
    }

    function returnDeployedFunds(
        IERC20 _token,
        uint256 _amount,
        address _from
    ) external onlyOwner(_msgSender()) {
        require(stakePositionData[_token].created > 0, "Stake does not exist");

        StakeAsset storage _stakePosition = stakePositionData[_token];

        require(
            _token.transferFrom(_from, address(this), _amount),
            "Token could not be transferred"
        );

        _stakePosition.deployedAmount -= _amount;
        emit FundsReturned(_token, _from, _amount);
    }

    function checkStakeDuplicate(IERC20 _token) internal view returns (bool) {
        // uint256 length = stakeAssets.length;
        // for (uint256 pid = 0; pid < length; ++pid) {
        //     if (stakeAssets[pid].stakeToken == _token) {
        //         return true;
        //     }
        // }
        if (stakePositionData[_token].created > 0) {
            return true;
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
    ) external onlyOwner(_msgSender()) {
        require(
            _token.transfer(_to, _token.balanceOf(address(this))),
            "Token could not be transferred"
        );
    }

    function checkIfAddressIsPosition(
        IStakingPosition _position
    ) internal view returns (bool) {
        // uint256 length = stakePosition.length;
        // for (uint256 pid = 0; pid < length; ++pid) {
        //     if (stakeAssets[pid].positionToken == _position) {
        //         return true;
        //     }
        // }
        if (allStakePositions[_position] != IERC20(address(0))) {
            if (stakePosition[allStakePositions[_position]] == _position) {
                return true;
            }
        }
        return false;
    }
}
