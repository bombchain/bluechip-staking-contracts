// SPDX-License-Identifier: MIT
pragma solidity >=0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./owner/Operator.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./interfaces/IStakeVault.sol";

contract StakingPosition is ERC721EnumerableUpgradeable, OwnableUpgradeable {
    using StringsUpgradeable for uint256;
    using CountersUpgradeable for CountersUpgradeable.Counter;

    // ************** //
    // *** EVENTS *** //
    // ************** //

    event CreateStake(
        address indexed user,
        uint256 indexed tokenId,
        uint256 amountStaked,
        uint256 lockOptionIndex,
        bool fromCompound,
        bool isBonus
    );

    event UnstakeTokens(
        address indexed user,
        uint256 indexed tokenId,
        bool toCompound,
        bool earlyUnstake,
        bool refunded
    );

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

    event SetBonusMinAmount(uint256 indexed bonusMinAmount);

    event SetBonusLockIndex(uint256 indexed lockIndex);

    event ReferralBonusAwarded(
        address indexed user,
        uint256 bonusAmount,
        uint256 bonusLockIndex
    );

    event FreePositionBonus(
        address indexed user,
        uint256 amount,
        uint256 lockIndex
    );

    event SetCapacity(uint256 indexed capacity);

    // Immutables (for MasterContract and all clones)
    IStakeVault public immutable vault;
    StakingPosition public immutable masterContract;

    // Per clone variables
    // Clone init settings
    IERC20 public stakeToken;

    uint256 private constant ONE_YEAR = 365 days;
    uint256 private constant ONE_WEEK = 7 days;
    uint16 private constant PERCENT_DENOMENATOR = 10000;

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
        bool assetTransferred;
        bool isBonusPosition;
    }
    // tokenId => Stake
    mapping(uint256 => Stake) public stakes;

    mapping(uint256 => bool) public isBlacklisted;

    CountersUpgradeable.Counter internal _ids;

    string private baseTokenURI; // baseTokenURI can point to IPFS folder like https://ipfs.io/ipfs/{cid}/ while

    // array of all the NFT token IDs owned by a user
    mapping(address => uint256[]) public allUserOwned;
    // the index in the token ID array at allUserOwned to save gas on operations

    mapping(uint256 => uint256) public ownedIndex;

    mapping(uint256 => uint256) public tokenMintedAt;

    mapping(uint256 => uint256) public tokenLastTransferred;

    //  mapping(address => bool) public hasReceivedBonus;

    // uint256 referralBonusAmount = 0.003 ether;

    // uint256 referralMinAmount = 0.01 ether;

    // uint256 referralBonusLockIndex = 1;

    uint256 public referralBonusAmount;

    uint256 public referralMinAmount;

    uint256 public referralBonusLockIndex;

    uint256 public capacity;

    uint256 public endTime;

    uint256 public amountStaked;

    uint256 public totalYieldAtMaturity;

    address private _operator;

    modifier onlyOwnerOrVault() {
        require(
            address(vault) == msg.sender ||
                vault.admin() == msg.sender ||
                owner() == msg.sender,
            "!owner"
        );
        _;
    }

    modifier onlyIfNoBonus() {
        bool bonus;
        bonus = hasReceivedBonus(msg.sender);
        require(!bonus, "Bonus already received");
        _;
    }

    function usersBonus(
        address _user
    ) public view returns (address, uint256, uint256, uint256, bool) {
        return vault.usersBonus(_user);
    }

    function hasReceivedBonus(
        address _user
    ) public view returns (bool _receivedBonus) {
        (, , , , _receivedBonus) = usersBonus(_user);
    }

    constructor(IStakeVault _stakeVault) ERC721Upgradeable() {
        vault = _stakeVault;
        masterContract = this;
        _disableInitializers();
    }

    function initialize(
        string memory _name,
        string memory _symbol,
        address _stakeToken,
        string memory _baseTokenURI,
        uint256 _referralBonusAmount,
        uint256 _referralMinAmount
    ) public onlyOwnerOrVault initializer {
        __ERC721_init(_name, _symbol);
        __Ownable_init();
        stakeToken = IERC20(_stakeToken);
        baseTokenURI = _baseTokenURI;
        capacity = 0;
        endTime = 0;
        referralBonusAmount = _referralBonusAmount;
        referralMinAmount = _referralMinAmount;
        referralBonusLockIndex = 1;
    }

    function stake(uint256 _amount, uint256 _lockOptIndex) external virtual {
        _stake(_msgSender(), _amount, _lockOptIndex, true, true, false, false);
    }

    function initialBonus(uint256 _amount) external {
        uint256 bonusMax_;
        (, , , , , , bonusMax_, ) = vault.stakePositionData(
            address(stakeToken)
        );

        uint256 usersBonusCreated_;
        bool usersReferralBonus_;
        (, , usersBonusCreated_, , usersReferralBonus_) = vault.usersBonus(
            _msgSender()
        );

        require(usersBonusCreated_ == 0, "User already received a bonus");
        require(
            _amount <= bonusMax_,
            "Bonus amount must be less than or equal to the max"
        );
        vault._updateUserBonus(
            _msgSender(),
            address(stakeToken),
            _amount,
            block.timestamp,
            0,
            usersReferralBonus_
        );

        _stake(_msgSender(), _amount, 1, false, false, false, true);
        emit FreePositionBonus(_msgSender(), _amount, 1);
    }

    function freeStakeBonus(
        address _user,
        uint256 _amount,
        uint256 _lockOptIndex
    ) external virtual onlyOwnerOrVault {
        _stake(_user, _amount, _lockOptIndex, false, false, false, false);
        emit FreePositionBonus(_user, _amount, _lockOptIndex);
    }

    function stakeWithReferral(
        uint256 _amount,
        uint256 _lockOptIndex,
        address _referrer
    ) external virtual {
        require(_amount >= referralMinAmount, "Must stake larger amount");

        address usersStakeToken_;
        uint256 usersBonusAmount_;
        uint256 usersBonusCreated_;
        uint256 stakingDeposits_;
        bool usersReferralBonus_;
        (
            usersStakeToken_,
            usersBonusAmount_,
            usersBonusCreated_,
            stakingDeposits_,
            usersReferralBonus_
        ) = vault.usersBonus(_msgSender());

        require(usersReferralBonus_ == false, "User already received a bonus");

        vault._updateUserBonus(
            _msgSender(),
            usersStakeToken_,
            usersBonusAmount_,
            usersBonusCreated_,
            stakingDeposits_,
            true
        );

        _stake(msg.sender, _amount, _lockOptIndex, true, false, false, false);

        //hasReceivedBonus[_msgSender()] = true;

        _stake(
            msg.sender,
            referralBonusAmount,
            referralBonusLockIndex,
            false,
            false,
            false,
            false
        );
        _stake(
            _referrer,
            referralBonusAmount,
            referralBonusLockIndex,
            false,
            false,
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
        bool _allowWithdrawEarly,
        bool _fromCompound,
        bool _isBonus
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
            vault._deposit(_user, address(stakeToken), _amountStaked);
            handleInitialBonus(_user, _amountStaked);
        }

        stakes[_ids.current()] = Stake({
            created: block.timestamp,
            amountStaked: _amountStaked,
            apr: _aprLockOptions[_lockOptIndex].apr,
            lockTime: _aprLockOptions[_lockOptIndex].lockTime,
            allowWithdrawEarly: _allowWithdrawEarly,
            assetTransferred: _transferStakeToken,
            isBonusPosition: _isBonus
        });

        _safeMint(_user, _ids.current());
        tokenMintedAt[_ids.current()] = block.timestamp;

        emit CreateStake(
            _user,
            _ids.current(),
            _amountStaked,
            _lockOptIndex,
            _fromCompound,
            _isBonus
        );
    }

    function withdraw(uint256 _tokenId, bool _isEarlyWithdraw) public {
        address _user = msg.sender;
        Stake memory _tokenStake = stakes[_tokenId];
        require(
            _user == ownerOf(_tokenId),
            "only the owner of the staked tokens can unstake"
        );

        if (_tokenStake.isBonusPosition) {
            require(
                checkBonusCanWithdraw(_user),
                "Not eligible to claim bonus position.  Ensure adequate deposits were made"
            );
        }

        bool _isUnstakingEarly = block.timestamp <
            _tokenStake.created + _tokenStake.lockTime;

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
                _tokenStake.amountStaked / 2,
                0
            );
            emit UnstakeTokens(_user, _tokenId, false, true, false);
        } else {
            uint256 _totalEarnedAmount = getTotalEarnedAmount(_tokenId);
            vault._withdraw(
                _user,
                address(stakeToken),
                _tokenStake.amountStaked,
                _totalEarnedAmount
            );
            emit UnstakeTokens(_user, _tokenId, false, false, false);
        }

        // this NFT is useless after the user unstakes
        _burn(_tokenId);
    }

    function adminRefundDeposit(uint256 _tokenId) external onlyOwnerOrVault {
        Stake memory _tokenStake = stakes[_tokenId];

        address _user = ownerOf(_tokenId);

        vault._withdraw(
            _user,
            address(stakeToken),
            _tokenStake.amountStaked,
            0
        );
        emit UnstakeTokens(_user, _tokenId, false, false, true);

        // this NFT is useless after the user unstakes
        _burn(_tokenId);
    }

    function withdrawMulti(
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

        if (_tokenStake.isBonusPosition) {
            require(
                checkBonusCanWithdraw(_user),
                "Not eligible to claim bonus position.  Ensure adequate deposits were made"
            );
        }

        uint256 _totalEarnedAmount = getTotalEarnedAmount(_tokenId);

        _burn(_tokenId);
        emit UnstakeTokens(_user, _tokenId, true, false, false);

        _stake(
            _user,
            _tokenStake.amountStaked + _totalEarnedAmount,
            _lockOptIndex,
            false,
            true,
            true,
            false
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

    // The purpose of this function is for handling stake deposits
    // It should update the amount deposited towards unlocking a bonus
    // only if it is within the first 6 months
    function handleInitialBonus(
        address _user,
        uint256 _depositAmount
    ) internal returns (bool) {
        uint256 usersBonusAmount_;
        uint256 usersBonusCreated_;
        uint256 usersStakingDeposits_;
        bool usersReferralBonus_;
        (
            ,
            usersBonusAmount_,
            usersBonusCreated_,
            usersStakingDeposits_,
            usersReferralBonus_
        ) = vault.usersBonus(_user);

        if (block.timestamp <= usersBonusCreated_ + (ONE_YEAR / 2)) {
            vault._updateUserBonus(
                _user,
                address(stakeToken),
                usersBonusAmount_,
                usersBonusCreated_,
                usersStakingDeposits_ + _depositAmount,
                usersReferralBonus_
            );
            return true;
        }
        return false;
    }

    // The purpose of this function is for checking if a user has made adequate deposits
    // to be able to withdraw their initial bonus.
    // The function which adds qualifying deposits to the users bonus data, it checks to ensure those deposits
    // are within the first 6 months.  This function doesn't need to check the date, only that the qualifying deposits are
    // high enough.
    function checkBonusCanWithdraw(address _user) internal view returns (bool) {
        uint256 usersBonusAmount_;
        uint256 usersStakingDeposits_;
        (, usersBonusAmount_, , usersStakingDeposits_, ) = vault.usersBonus(
            _user
        );

        if (
            (usersBonusAmount_ * 10) <= usersStakingDeposits_ // Check if user has made deposits equal to 10 times the bonus
        ) {
            return true;
        }
        return false;
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
    ) public view virtual override(ERC721EnumerableUpgradeable) returns (bool) {
        return super.supportsInterface(_interfaceId);
    }

    function getLastMintedTokenId() external view returns (uint256) {
        return _ids.current();
    }

    // function getStakeToken() external view returns (address) {
    //     return address(stakeToken);
    // }

    function isTokenMinted(uint256 _tokenId) external view returns (bool) {
        return _exists(_tokenId);
    }

    function setBaseURI(string memory _uri) external onlyOwnerOrVault {
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

    function setBonusAmount(uint256 _bonusAmount) external onlyOwnerOrVault {
        referralBonusAmount = _bonusAmount;
        emit SetBonusAmount(_bonusAmount);
    }

    function setBonusMinAmount(
        uint256 _bonusMinAmount
    ) external onlyOwnerOrVault {
        referralMinAmount = _bonusMinAmount;
        emit SetBonusMinAmount(_bonusMinAmount);
    }

    function setBonusLockIndex(uint256 _lockIndex) external onlyOwnerOrVault {
        referralBonusLockIndex = _lockIndex;
        emit SetBonusLockIndex(_lockIndex);
    }

    function setCapacity(uint256 _capacity) external onlyOwnerOrVault {
        capacity = _capacity;
        emit SetCapacity(_capacity);
    }

    function setIsBlacklisted(
        uint256 _tokenId,
        bool _isBlacklisted
    ) external onlyOwnerOrVault {
        isBlacklisted[_tokenId] = _isBlacklisted;
        emit SetTokenBlacklist(_tokenId, _isBlacklisted);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function _beforeTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId,
        uint256 _batchSize
    ) internal virtual override(ERC721EnumerableUpgradeable) {
        require(!isBlacklisted[_tokenId], "blacklisted NFT");
        tokenLastTransferred[_tokenId] = block.timestamp;

        super._beforeTokenTransfer(_from, _to, _tokenId, _batchSize);
    }

    function _afterTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId,
        uint256 _batchSize
    ) internal virtual override(ERC721Upgradeable) {
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

        super._afterTokenTransfer(_from, _to, _tokenId, _batchSize);
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
