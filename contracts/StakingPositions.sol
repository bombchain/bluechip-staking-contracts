// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./interfaces/IStakeVault.sol";

contract StakingPositions is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    uint256 private constant ONE_YEAR = 365 days;
    uint256 private constant ONE_WEEK = 7 days;
    uint16 private constant PERCENT_DENOMENATOR = 10000;

    IERC20 internal stakeToken;

    IStakeVault public vault;

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

    modifier onlyOwnerOrVault() {
        require(
            address(vault) == msg.sender ||
                // treasury == msg.sender ||
                owner() == msg.sender,
            "!owner"
        );
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

    constructor(
        string memory _name,
        string memory _symbol,
        address _stakeToken,
        address _vault,
        string memory _baseTokenURI
    ) ERC721(_name, _symbol) {
        stakeToken = IERC20(_stakeToken);
        baseTokenURI = _baseTokenURI;
        vault = IStakeVault(_vault);
        //   vault.registerAsset(_stakeToken, address(this));
        //stakeToken.approve(address(vault), type(uint256).max);
    }

    function stake(uint256 _amount, uint256 _lockOptIndex) external virtual {
        _stake(msg.sender, _amount, _lockOptIndex, true, true);
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
        if (_transferStakeToken) {
            vault.deposit(_user, address(stakeToken), _amountStaked);
        }

        _ids.increment();
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

    function withdraw(uint256 _tokenId) public {
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
            stakeToken.transferFrom(
                address(vault),
                _user,
                _tokenStake.amountStaked / 2
            );
        } else {
            uint256 _totalEarnedAmount = getTotalEarnedAmount(_tokenId);
            stakeToken.transferFrom(
                address(vault),
                _user,
                _tokenStake.amountStaked + _totalEarnedAmount
            );
        }

        // this NFT is useless after the user unstakes
        _burn(_tokenId);

        emit UnstakeTokens(_user, _tokenId);
    }

    function withdrawEarlyMulti(uint256[] memory _tokenIds) external {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            withdraw(_tokenIds[i]);
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
        if (_secondsStaked > (_tokenStake.created + _tokenStake.lockTime)) {
            _secondsRewards = _tokenStake.created + _tokenStake.lockTime;
        } else {
            _secondsRewards = _secondsStaked;
        }

        return
            (_tokenStake.amountStaked * _tokenStake.apr * _secondsRewards) /
            PERCENT_DENOMENATOR /
            ONE_YEAR;
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

    function governanceRecoverUnsupported(
        IERC20 _token,
        address _to
    ) external onlyOwnerOrVault {
        _token.transfer(_to, _token.balanceOf(address(this)));
    }
}
