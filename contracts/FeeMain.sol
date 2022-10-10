import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

import "./interfaces/IOracle.sol";
import "./interfaces/IPegToken.sol";
import "./interfaces/IRouter.sol";

// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract FeeMain is ContextUpgradeable {
    using SafeMathUpgradeable for uint256;
    using AddressUpgradeable for address;
    using SafeERC20Upgradeable for IERC20;

    event OperatorTransferred(
        address indexed previousOperator,
        address indexed newOperator
    );

    address public dev;

    address private _operator;

    address public outputToken;

    address public feeReceiver;

    address public unirouter;

    /* ========== FUNCTIONS ========== */

    // Info of each token.

    function __FeeMain_init(address _dev) internal initializer {
        __Context_init_unchained();
        __FeeMain_init_unchained(_dev);
    }

    function __FeeMain_init_unchained(address _dev) internal initializer {
        dev = _dev;
        _operator = _dev;
        emit OperatorTransferred(address(0), _operator);
    }

    function setOutputToken(address _outputToken) public onlyOwner {
        outputToken = _outputToken;
    }

    function setUnirouter(address _unirouter) external onlyOwner {
        unirouter = _unirouter;
    }

    function setFeeReceiver(address _feeReceiver) external onlyOwner {
        feeReceiver = _feeReceiver;
    }

    function _giveAllowance(address _address) internal {
        IERC20(_address).approve(unirouter, 0);
        IERC20(_address).approve(unirouter, uint256(1e50));
    }

    function _removeAllowance(address _address) internal {
        IERC20(_address).approve(unirouter, 0);
    }

    /** wallet addresses setters **/
    function transferDev(address value) public onlyOwner {
        dev = value;
    }

    function operator() public view returns (address) {
        return _operator;
    }

    modifier onlyOperator() {
        require(
            _operator == _msgSender(),
            "operator: caller is not the operator"
        );
        _;
    }

    modifier onlyOwner() {
        require(dev == _msgSender(), "operator: caller is not the operator");
        _;
    }

    modifier ownerOrOperator() {
        require(
            dev == _msgSender() || _operator == _msgSender(),
            "operator: caller is not the operator"
        );
        _;
    }

    function isOperator() public view returns (bool) {
        return _msgSender() == _operator;
    }

    function transferOperator(address newOperator_) public onlyOwner {
        _transferOperator(newOperator_);
    }

    function _transferOperator(address newOperator_) internal {
        require(
            newOperator_ != address(0),
            "operator: zero address given for new operator"
        );
        emit OperatorTransferred(address(0), newOperator_);
        _operator = newOperator_;
    }

    /* ========== EMERGENCY ========== */

    function governanceRecoverUnsupported(IERC20 _token) external onlyOwner {
        _token.transfer(dev, _token.balanceOf(address(this)));
    }
}