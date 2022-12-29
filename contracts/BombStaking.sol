// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./libraries/BoringERC20.sol";
import "./interfaces/IStakeVault.sol";
import "./interfaces/IBentoBoxV1.sol";
import "./libraries/RebaseLibrary.sol";

import "./interfaces/IMasterContract.sol";

contract BombStaking is ERC721Enumerable, Ownable, IMasterContract {
    using Strings for uint256;
    using Counters for Counters.Counter;
    using RebaseLibrary for Rebase;
    using BoringERC20 for IERC20;

    // Immutables (for MasterContract and all clones)
    IBentoBoxV1 public immutable bentoBox;
    StakingPositions public immutable masterContract;

    uint256 private constant ONE_YEAR = 365 days;
    uint256 private constant ONE_WEEK = 7 days;
    uint16 private constant PERCENT_DENOMENATOR = 10000;

    IERC20 public stakeToken;

    struct AprLock {
        uint16 apr;
        uint256 lockTime;
    }
    AprLock[] internal _aprLockOptions;

    struct Stake {
        uint256 created;
        uint256 amountStaked;
        uint16 apr;
        uint256 lockTime;
        bool allowWithdrawEarly;
    }
    // tokenId => Stake
    mapping(uint256 => Stake) public stakes;
    // // tokenId => amount
    // mapping(uint256 => uint256) public yieldClaimed;
    // // tokenId => timestamp
    // mapping(uint256 => uint256) public lastClaim;
    // tokenId => boolean
    mapping(uint256 => bool) public isBlacklisted;

    Counters.Counter internal _ids;
    string private baseTokenURI; // baseTokenURI can point to IPFS folder like https://ipfs.io/ipfs/{cid}/ while

    // array of all the NFT token IDs owned by a user
    mapping(address => uint256[]) public allUserOwned;
    // the index in the token ID array at allUserOwned to save gas on operations
    mapping(uint256 => uint256) public ownedIndex;

    mapping(uint256 => uint256) public tokenMintedAt;
    mapping(uint256 => uint256) public tokenLastTransferred;

    mapping(address => bool) public hasReceivedBonus;

    uint256 referralBonusAmount = 0.003 ether;

    uint256 referralBonusLockIndex = 1;

    uint256 public capacity;

    uint256 public endTime;

    uint256 public amountStaked;

    uint256 public totalYieldAtMaturity;

    modifier onlyOwnerOrVault() {
        require(
            address(vault) == msg.sender ||
                // treasury == msg.sender ||
                owner() == msg.sender,
            "!owner"
        );
        _;
    }

    modifier onlyIfNoBonus() {
        require(!hasReceivedBonus[msg.sender], "Bonus already received");
        _;
    }

    event CreateStake(
        address indexed user,
        uint256 indexed tokenId,
        uint256 amountStaked,
        uint256 lockOptionIndex
    );
    event UnstakeTokens(address indexed user, uint256 indexed tokenId);
    event SetAnnualApr(uint256 indexed newApr);
    event SetBaseTokenURI(string indexed newUri);
    event AddAprLockOption(uint16 indexed apr, uint256 lockTime);
    event RemoveAprLockOption(
        uint256 indexed index,
        uint16 indexed apr,
        uint256 lockTime
    );
    event UpdateAprLockOption(
        uint256 indexed index,
        uint16 indexed oldApr,
        uint256 oldLockTime,
        uint16 newApr,
        uint256 newLockTime
    );
    event SetTokenBlacklist(uint256 indexed tokenId, bool isBlacklisted);
    event SetBonusAmount(uint256 indexed bonusAmount);
    event SetBonusLockIndex(uint256 indexed lockIndex);
    event ReferralBonusAwarded(
        address indexed user,
        uint256 bonusAmount,
        uint256 bonusLockIndex
    );
    event SetCapacity(uint256 indexed capacity);

    constructor(
        string memory _name,
        string memory _symbol,
        address _stakeToken,
        address _vault,
        string memory _baseTokenURI,
        uint256 _capacity,
        uint256 _endTime
    ) ERC721(_name, _symbol) {
        stakeToken = IERC20(_stakeToken);
        baseTokenURI = _baseTokenURI;
        vault = IStakeVault(_vault);
        capacity = _capacity;
        endTime = _endTime;
        //   vault.registerAsset(_stakeToken, address(this));
        //stakeToken.approve(address(vault), type(uint256).max);
    }

    function stake(uint256 _amount, uint256 _lockOptIndex) external virtual {
        _stake(_msgSender(), _amount, _lockOptIndex, true, true);
    }

    function stakeWithReferral(
        uint256 _amount,
        uint256 _lockOptIndex,
        address _referrer
    ) external virtual onlyIfNoBonus {
        _stake(msg.sender, _amount, _lockOptIndex, true, false);
        _stake(
            msg.sender,
            referralBonusAmount,
            referralBonusLockIndex,
            false,
            false
        );
        _stake(
            _referrer,
            referralBonusAmount,
            referralBonusLockIndex,
            false,
            false
        );
        emit ReferralBonusAwarded(
            msg.sender,
            referralBonusAmount,
            referralBonusLockIndex
        );
        emit ReferralBonusAwarded(
            _referrer,
            referralBonusAmount,
            referralBonusLockIndex
        );
    }

    function _stake(
        address _user,
        uint256 _amountStaked,
        uint256 _lockOptIndex,
        bool _transferStakeToken,
        bool _allowWithdrawEarly
    ) internal {
        require(_lockOptIndex < _aprLockOptions.length, "invalid lock option");
        _amountStaked = _amountStaked == 0
            ? stakeToken.balanceOf(_user)
            : _amountStaked;
        require(
            _amountStaked > 0,
            "must stake and be earning at least some tokens"
        );
        require(
            _amountStaked + amountStaked <= capacity || capacity == 0,
            "Over capacity"
        );
        require(
            block.timestamp <= endTime || endTime == 0,
            "Stake period over"
        );

        amountStaked += _amountStaked;
        _ids.increment();
        uint256 _yieldAtMaturity = (_amountStaked *
            _aprLockOptions[_lockOptIndex].apr *
            _aprLockOptions[_lockOptIndex].lockTime) /
            PERCENT_DENOMENATOR /
            ONE_YEAR;
        totalYieldAtMaturity += _yieldAtMaturity;
        if (_transferStakeToken) {
            vault._deposit(
                _user,
                address(stakeToken),
                _amountStaked,
                _yieldAtMaturity
            );
        }
        stakes[_ids.current()] = Stake({
            created: block.timestamp,
            amountStaked: _amountStaked,
            apr: _aprLockOptions[_lockOptIndex].apr,
            lockTime: _aprLockOptions[_lockOptIndex].lockTime,
            allowWithdrawEarly: _allowWithdrawEarly
        });

        _safeMint(_user, _ids.current());
        tokenMintedAt[_ids.current()] = block.timestamp;

        emit CreateStake(_user, _ids.current(), _amountStaked, _lockOptIndex);
    }

    function withdraw(uint256 _tokenId, bool _isEarlyWithdraw) public {
        address _user = msg.sender;
        Stake memory _tokenStake = stakes[_tokenId];
        require(
            _user == ownerOf(_tokenId),
            "only the owner of the staked tokens can unstake"
        );
        bool _isUnstakingEarly = block.timestamp <
            _tokenStake.created + _tokenStake.lockTime;

        // send back original tokens staked
        // if unstaking early based on lock period, only get a portion back
        if (_isUnstakingEarly) {
            require(
                _tokenStake.allowWithdrawEarly,
                "This position is not eligible for early withdraw"
            );
            require(
                _isEarlyWithdraw,
                "Must acknowledge the early withdraw due to loss of tokens"
            );
            vault._withdraw(
                _user,
                address(stakeToken),
                _tokenStake.amountStaked / 2
            );
            // todo add early withdraw event and indicate somewhere about the extra tokens
        } else {
            uint256 _totalEarnedAmount = getTotalEarnedAmount(_tokenId);
            vault._withdraw(
                _user,
                address(stakeToken),
                _tokenStake.amountStaked + _totalEarnedAmount
            );
        }

        // this NFT is useless after the user unstakes
        _burn(_tokenId);

        emit UnstakeTokens(_user, _tokenId);
    }

    function withdrawEarlyMulti(
        uint256[] memory _tokenIds,
        bool isWithdrawEarly
    ) external {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            withdraw(_tokenIds[i], isWithdrawEarly);
        }
    }

    function claimAndCompound(
        address _user,
        uint256 _tokenId,
        uint256 _lockOptIndex
    ) public {
        require(!isBlacklisted[_tokenId], "blacklisted NFT");
        require(_user == ownerOf(_tokenId));
        Stake memory _tokenStake = stakes[_tokenId];
        require(
            block.timestamp > _tokenStake.created + _tokenStake.lockTime,
            "Position is not at maturity"
        );

        uint256 _totalEarnedAmount = getTotalEarnedAmount(_tokenId);

        _burn(_tokenId);

        _stake(
            _user,
            _tokenStake.amountStaked + _totalEarnedAmount,
            _lockOptIndex,
            false,
            true
        );
    }

    function claimAndCompoundMulti(
        address _user,
        uint256[] memory _tokenIds,
        uint256 _lockOptIndex
    ) external {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            claimAndCompound(_user, _tokenIds[i], _lockOptIndex);
        }
    }

    function tokenURI(
        uint256 _tokenId
    ) public view virtual override returns (string memory) {
        require(_exists(_tokenId), "token does not exist");
        return
            string(abi.encodePacked(_baseURI(), _tokenId.toString(), ".json"));
    }

    // Contract metadata URI - Support for OpenSea: https://docs.opensea.io/docs/contract-level-metadata
    function contractURI() public view returns (string memory) {
        return string(abi.encodePacked(_baseURI(), "contract.json"));
    }

    // Override supportsInterface - See {IERC165-supportsInterface}
    function supportsInterface(
        bytes4 _interfaceId
    ) public view virtual override(ERC721Enumerable) returns (bool) {
        return super.supportsInterface(_interfaceId);
    }

    function getLastMintedTokenId() external view returns (uint256) {
        return _ids.current();
    }

    function getStakeToken() external view returns (address) {
        return address(stakeToken);
    }

    function isTokenMinted(uint256 _tokenId) external view returns (bool) {
        return _exists(_tokenId);
    }

    function setBaseURI(string memory _uri) external onlyOwner {
        baseTokenURI = _uri;
        emit SetBaseTokenURI(_uri);
    }

    function getAllUserOwned(
        address _user
    ) external view returns (uint256[] memory) {
        return allUserOwned[_user];
    }

    function getTotalEarnedAmount(
        uint256 _tokenId
    ) public view returns (uint256) {
        Stake memory _tokenStake = stakes[_tokenId];
        uint256 _secondsStaked = block.timestamp - _tokenStake.created;
        uint256 _secondsRewards;
        if (_secondsStaked > (_tokenStake.lockTime)) {
            _secondsRewards = _tokenStake.lockTime;
        } else {
            _secondsRewards = _secondsStaked;
        }

        return
            (_tokenStake.amountStaked * _tokenStake.apr * _secondsRewards) /
            PERCENT_DENOMENATOR /
            ONE_YEAR;
    }

    function getTotalYieldAtMaturity(
        uint256 _tokenId
    ) public view returns (uint256) {
        Stake memory _tokenStake = stakes[_tokenId];

        // uint256 _secondsRewards = _tokenStake.created + _tokenStake.lockTime;

        return
            (_tokenStake.amountStaked *
                _tokenStake.apr *
                _tokenStake.lockTime) /
            PERCENT_DENOMENATOR /
            ONE_YEAR;
    }

    function getTotalValueAtMaturity(
        uint256 _tokenId
    ) public view returns (uint256) {
        Stake memory _tokenStake = stakes[_tokenId];

        //  uint256 _secondsRewards = _tokenStake.created + _tokenStake.lockTime;

        return
            _tokenStake.amountStaked +
            ((_tokenStake.amountStaked *
                _tokenStake.apr *
                _tokenStake.lockTime) /
                PERCENT_DENOMENATOR /
                ONE_YEAR);
    }

    function getAllLockOptions() external view returns (AprLock[] memory) {
        return _aprLockOptions;
    }

    function addAprLockOption(
        uint16 _apr,
        uint256 _lockTime
    ) external onlyOwnerOrVault {
        _addAprLockOption(_apr, _lockTime);
        emit AddAprLockOption(_apr, _lockTime);
    }

    function _addAprLockOption(uint16 _apr, uint256 _lockTime) internal {
        _aprLockOptions.push(AprLock({apr: _apr, lockTime: _lockTime}));
    }

    function removeAprLockOption(uint256 _index) external onlyOwnerOrVault {
        AprLock memory _option = _aprLockOptions[_index];
        _aprLockOptions[_index] = _aprLockOptions[_aprLockOptions.length - 1];
        _aprLockOptions.pop();
        emit RemoveAprLockOption(_index, _option.apr, _option.lockTime);
    }

    function updateAprLockOption(
        uint256 _index,
        uint16 _apr,
        uint256 _lockTime
    ) external onlyOwnerOrVault {
        AprLock memory _option = _aprLockOptions[_index];
        _aprLockOptions[_index] = AprLock({apr: _apr, lockTime: _lockTime});
        emit UpdateAprLockOption(
            _index,
            _option.apr,
            _option.lockTime,
            _apr,
            _lockTime
        );
    }

    function setBonusAmount(uint256 _bonusAmount) external onlyOwner {
        referralBonusAmount = _bonusAmount;
        emit SetBonusAmount(_bonusAmount);
    }

    function setBonusLockIndex(uint256 _lockIndex) external onlyOwner {
        referralBonusLockIndex = _lockIndex;
        emit SetBonusLockIndex(_lockIndex);
    }

    function setCapacity(uint256 _capacity) external onlyOwner {
        capacity = _capacity;
        emit SetCapacity(_capacity);
    }

    function setIsBlacklisted(
        uint256 _tokenId,
        bool _isBlacklisted
    ) external onlyOwner {
        isBlacklisted[_tokenId] = _isBlacklisted;
        emit SetTokenBlacklist(_tokenId, _isBlacklisted);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function _beforeTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal virtual override(ERC721Enumerable) {
        require(!isBlacklisted[_tokenId], "blacklisted NFT");
        tokenLastTransferred[_tokenId] = block.timestamp;

        super._beforeTokenTransfer(_from, _to, _tokenId);
    }

    function _afterTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal virtual override(ERC721) {
        // if from == address(0), token is being minted
        if (_from != address(0)) {
            uint256 _currIndex = ownedIndex[_tokenId];
            uint256 _tokenIdMovingIndices = allUserOwned[_from][
                allUserOwned[_from].length - 1
            ];
            allUserOwned[_from][_currIndex] = allUserOwned[_from][
                allUserOwned[_from].length - 1
            ];
            allUserOwned[_from].pop();
            ownedIndex[_tokenIdMovingIndices] = _currIndex;
        }

        // if to == address(0), token is being burned
        if (_to != address(0)) {
            ownedIndex[_tokenId] = allUserOwned[_to].length;
            allUserOwned[_to].push(_tokenId);
        }

        super._afterTokenTransfer(_from, _to, _tokenId);
    }

    // Functions that need accrue to be called
    uint8 internal constant ACTION_ADD_ASSET = 1;
    uint8 internal constant ACTION_REPAY = 2;
    uint8 internal constant ACTION_REMOVE_ASSET = 3;
    uint8 internal constant ACTION_REMOVE_COLLATERAL = 4;
    uint8 internal constant ACTION_BORROW = 5;
    uint8 internal constant ACTION_GET_REPAY_SHARE = 6;
    uint8 internal constant ACTION_GET_REPAY_PART = 7;
    uint8 internal constant ACTION_ACCRUE = 8;

    // Functions that don't need accrue to be called
    uint8 internal constant ACTION_ADD_COLLATERAL = 10;
    uint8 internal constant ACTION_UPDATE_EXCHANGE_RATE = 11;

    // Function on BentoBox
    uint8 internal constant ACTION_BENTO_DEPOSIT = 20;
    uint8 internal constant ACTION_BENTO_WITHDRAW = 21;
    uint8 internal constant ACTION_BENTO_TRANSFER = 22;
    uint8 internal constant ACTION_BENTO_TRANSFER_MULTIPLE = 23;
    uint8 internal constant ACTION_BENTO_SETAPPROVAL = 24;

    // Any external call (except to BentoBox)
    uint8 internal constant ACTION_CALL = 30;

    int256 internal constant USE_VALUE1 = -1;
    int256 internal constant USE_VALUE2 = -2;

    /// @dev Helper function for choosing the correct value (`value1` or `value2`) depending on `inNum`.
    function _num(
        int256 inNum,
        uint256 value1,
        uint256 value2
    ) internal pure returns (uint256 outNum) {
        outNum = inNum >= 0
            ? uint256(inNum)
            : (inNum == USE_VALUE1 ? value1 : value2);
    }

    /// @dev Helper function for depositing into `bentoBox`.
    function _bentoDeposit(
        bytes memory data,
        uint256 value,
        uint256 value1,
        uint256 value2
    ) internal returns (uint256, uint256) {
        (IERC20 token, address to, int256 amount, int256 share) = abi.decode(
            data,
            (IERC20, address, int256, int256)
        );
        amount = int256(_num(amount, value1, value2)); // Done this way to avoid stack too deep errors
        share = int256(_num(share, value1, value2));
        return
            bentoBox.deposit{value: value}(
                token,
                msg.sender,
                to,
                uint256(amount),
                uint256(share)
            );
    }

    /// @dev Helper function to withdraw from the `bentoBox`.
    function _bentoWithdraw(
        bytes memory data,
        uint256 value1,
        uint256 value2
    ) internal returns (uint256, uint256) {
        (IERC20 token, address to, int256 amount, int256 share) = abi.decode(
            data,
            (IERC20, address, int256, int256)
        );
        return
            bentoBox.withdraw(
                token,
                msg.sender,
                to,
                _num(amount, value1, value2),
                _num(share, value1, value2)
            );
    }

    /// @dev Helper function to perform a contract call and eventually extracting revert messages on failure.
    /// Calls to `bentoBox` are not allowed for obvious security reasons.
    /// This also means that calls made from this contract shall *not* be trusted.
    function _call(
        uint256 value,
        bytes memory data,
        uint256 value1,
        uint256 value2
    ) internal returns (bytes memory, uint8) {
        (
            address callee,
            bytes memory callData,
            bool useValue1,
            bool useValue2,
            uint8 returnValues
        ) = abi.decode(data, (address, bytes, bool, bool, uint8));

        if (useValue1 && !useValue2) {
            callData = abi.encodePacked(callData, value1);
        } else if (!useValue1 && useValue2) {
            callData = abi.encodePacked(callData, value2);
        } else if (useValue1 && useValue2) {
            callData = abi.encodePacked(callData, value1, value2);
        }

        require(
            callee != address(bentoBox) && callee != address(this),
            "KashiPair: can't call"
        );

        (bool success, bytes memory returnData) = callee.call{value: value}(
            callData
        );
        require(success, "KashiPair: call failed");
        return (returnData, returnValues);
    }

    struct CookStatus {
        bool needsSolvencyCheck;
        bool hasAccrued;
    }

    /// @notice Executes a set of actions and allows composability (contract calls) to other contracts.
    /// @param actions An array with a sequence of actions to execute (see ACTION_ declarations).
    /// @param values A one-to-one mapped array to `actions`. ETH amounts to send along with the actions.
    /// Only applicable to `ACTION_CALL`, `ACTION_BENTO_DEPOSIT`.
    /// @param datas A one-to-one mapped array to `actions`. Contains abi encoded data of function arguments.
    /// @return value1 May contain the first positioned return value of the last executed action (if applicable).
    /// @return value2 May contain the second positioned return value of the last executed action which returns 2 values (if applicable).
    function cook(
        uint8[] calldata actions,
        uint256[] calldata values,
        bytes[] calldata datas
    ) external payable returns (uint256 value1, uint256 value2) {
        CookStatus memory status;
        for (uint256 i = 0; i < actions.length; i++) {
            uint8 action = actions[i];
            if (!status.hasAccrued && action < 10) {
                accrue();
                status.hasAccrued = true;
            }
            if (action == ACTION_ADD_COLLATERAL) {
                (int256 share, address to, bool skim) = abi.decode(
                    datas[i],
                    (int256, address, bool)
                );
                addCollateral(to, skim, _num(share, value1, value2));
            } else if (action == ACTION_ADD_ASSET) {
                (int256 share, address to, bool skim) = abi.decode(
                    datas[i],
                    (int256, address, bool)
                );
                value1 = _addAsset(to, skim, _num(share, value1, value2));
            } else if (action == ACTION_REPAY) {
                (int256 part, address to, bool skim) = abi.decode(
                    datas[i],
                    (int256, address, bool)
                );
                _repay(to, skim, _num(part, value1, value2));
            } else if (action == ACTION_REMOVE_ASSET) {
                (int256 fraction, address to) = abi.decode(
                    datas[i],
                    (int256, address)
                );
                value1 = _removeAsset(to, _num(fraction, value1, value2));
            } else if (action == ACTION_REMOVE_COLLATERAL) {
                (int256 share, address to) = abi.decode(
                    datas[i],
                    (int256, address)
                );
                _removeCollateral(to, _num(share, value1, value2));
                status.needsSolvencyCheck = true;
            } else if (action == ACTION_BORROW) {
                (int256 amount, address to) = abi.decode(
                    datas[i],
                    (int256, address)
                );
                (value1, value2) = _borrow(to, _num(amount, value1, value2));
                status.needsSolvencyCheck = true;
            } else if (action == ACTION_UPDATE_EXCHANGE_RATE) {
                (bool must_update, uint256 minRate, uint256 maxRate) = abi
                    .decode(datas[i], (bool, uint256, uint256));
                (bool updated, uint256 rate) = updateExchangeRate();
                require(
                    (!must_update || updated) &&
                        rate > minRate &&
                        (maxRate == 0 || rate > maxRate),
                    "KashiPair: rate not ok"
                );
            } else if (action == ACTION_BENTO_SETAPPROVAL) {
                (
                    address user,
                    address _masterContract,
                    bool approved,
                    uint8 v,
                    bytes32 r,
                    bytes32 s
                ) = abi.decode(
                        datas[i],
                        (address, address, bool, uint8, bytes32, bytes32)
                    );
                bentoBox.setMasterContractApproval(
                    user,
                    _masterContract,
                    approved,
                    v,
                    r,
                    s
                );
            } else if (action == ACTION_BENTO_DEPOSIT) {
                (value1, value2) = _bentoDeposit(
                    datas[i],
                    values[i],
                    value1,
                    value2
                );
            } else if (action == ACTION_BENTO_WITHDRAW) {
                (value1, value2) = _bentoWithdraw(datas[i], value1, value2);
            } else if (action == ACTION_BENTO_TRANSFER) {
                (IERC20 token, address to, int256 share) = abi.decode(
                    datas[i],
                    (IERC20, address, int256)
                );
                bentoBox.transfer(
                    token,
                    msg.sender,
                    to,
                    _num(share, value1, value2)
                );
            } else if (action == ACTION_BENTO_TRANSFER_MULTIPLE) {
                (
                    IERC20 token,
                    address[] memory tos,
                    uint256[] memory shares
                ) = abi.decode(datas[i], (IERC20, address[], uint256[]));
                bentoBox.transferMultiple(token, msg.sender, tos, shares);
            } else if (action == ACTION_CALL) {
                (bytes memory returnData, uint8 returnValues) = _call(
                    values[i],
                    datas[i],
                    value1,
                    value2
                );

                if (returnValues == 1) {
                    (value1) = abi.decode(returnData, (uint256));
                } else if (returnValues == 2) {
                    (value1, value2) = abi.decode(
                        returnData,
                        (uint256, uint256)
                    );
                }
            } else if (action == ACTION_GET_REPAY_SHARE) {
                int256 part = abi.decode(datas[i], (int256));
                value1 = bentoBox.toShare(
                    asset,
                    totalBorrow.toElastic(_num(part, value1, value2), true),
                    true
                );
            } else if (action == ACTION_GET_REPAY_PART) {
                int256 amount = abi.decode(datas[i], (int256));
                value1 = totalBorrow.toBase(
                    _num(amount, value1, value2),
                    false
                );
            }
        }

    }

    function governanceRecoverUnsupported(
        IERC20 _token,
        address _to
    ) external onlyOwnerOrVault {
        require(
            _token.transfer(_to, _token.balanceOf(address(this))),
            "Could not transfer token"
        );
    }
}
