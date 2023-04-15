/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  StakeVaultV2,
  StakeVaultV2Interface,
} from "../../contracts/StakeVaultV2";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IERC20",
        name: "_stakeToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "FundsDeployed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IERC20",
        name: "_stakeToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "FundsReturned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IERC20",
        name: "_stakeToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_capacity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_endTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_active",
        type: "bool",
      },
    ],
    name: "UpdateAssetMetadata",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "OPERATOR_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "_deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_yieldEarned",
        type: "uint256",
      },
    ],
    name: "_withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IStakingPosition",
        name: "",
        type: "address",
      },
    ],
    name: "allStakePositions",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "masterContract",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "allowMasterContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowedMasterContracts",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
    ],
    name: "deployFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_masterContract",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "contract IERC20",
        name: "_stakeToken",
        type: "address",
      },
      {
        internalType: "string",
        name: "_baseTokenURI",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_capacity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "useDefaultLocks",
        type: "bool",
      },
    ],
    name: "deployStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
    ],
    name: "governanceRecoverUnsupported",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "masterContractOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
    ],
    name: "returnDeployedFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    name: "stakePosition",
    outputs: [
      {
        internalType: "contract IStakingPosition",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    name: "stakePositionData",
    outputs: [
      {
        internalType: "uint256",
        name: "created",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "capacity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "stakedAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "yieldEarned",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deployedAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "active",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_stakeToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_capacity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_active",
        type: "bool",
      },
    ],
    name: "updateAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061001961001e565b6100de565b600054610100900460ff161561008a5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff90811610156100dc576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b61206580620000ee6000396000f3fe608060405234801561001057600080fd5b506004361061018e5760003560e01c806397d3b573116100de578063c4d66de811610097578063e401050311610071578063e401050314610421578063f5b541a61461044b578063f851a44014610472578063f8d155e01461048657600080fd5b8063c4d66de8146103e8578063ca15c873146103fb578063d547741f1461040e57600080fd5b806397d3b573146102f75780639f13d5791461030a578063a217fddf1461031d578063b6c7bfea14610325578063bafe4f1414610338578063c08fe0661461036257600080fd5b80633d9abadb1161014b5780637160b02a116101255780637160b02a146102ab5780639010d07c146102be57806391d14854146102d157806393537a4a146102e457600080fd5b80633d9abadb1461023a5780633daf24911461025e5780635c975abb146102a057600080fd5b806301ffc9a714610193578063121361aa146101bb57806322798cec146101d0578063248a9ca3146101e35780632f2ff15d1461021457806336568abe14610227575b600080fd5b6101a66101a1366004611992565b610499565b60405190151581526020015b60405180910390f35b6101ce6101c93660046119dc565b6104c4565b005b6101ce6101de366004611ad9565b610603565b6102066101f1366004611ba7565b60009081526097602052604090206001015490565b6040519081526020016101b2565b6101ce610222366004611bc0565b6108f7565b6101ce610235366004611bc0565b610921565b6101a6610248366004611bf0565b61012d6020526000908152604090205460ff1681565b61028861026c366004611bf0565b610132602052600090815260409020546001600160a01b031681565b6040516001600160a01b0390911681526020016101b2565b60335460ff166101a6565b6101ce6102b9366004611c0d565b61099f565b6102886102cc366004611c4f565b610b0b565b6101a66102df366004611bc0565b610b2a565b6101ce6102f2366004611c0d565b610b55565b6101ce610305366004611c71565b610cb3565b6101ce610318366004611c9f565b610dd6565b610206600081565b6101ce610333366004611ccd565b610e7f565b610288610346366004611bf0565b61012e602052600090815260409020546001600160a01b031681565b6103b1610370366004611bf0565b610131602052600090815260409020805460018201546002830154600384015460048501546005860154600690960154949593949293919290919060ff1687565b604080519788526020880196909652948601939093526060850191909152608084015260a0830152151560c082015260e0016101b2565b6101ce6103f6366004611bf0565b610f60565b610206610409366004611ba7565b6110d2565b6101ce61041c366004611bc0565b6110e9565b61028861042f366004611bf0565b610130602052600090815260409020546001600160a01b031681565b6102067f97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b92981565b61013354610288906001600160a01b031681565b6101ce610494366004611d17565b61110e565b60006001600160e01b03198216635a05180f60e01b14806104be57506104be82611290565b92915050565b6104cd336112c5565b6104f25760405162461bcd60e51b81526004016104e990611d5d565b60405180910390fd5b6001600160a01b03821660009081526101316020526040812060028101805491928492610520908490611d93565b90915550506040516323b872dd60e01b81526001600160a01b038581166004830152306024830152604482018490528416906323b872dd906064016020604051808303816000875af115801561057a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061059e9190611da6565b6105ba5760405162461bcd60e51b81526004016104e990611dc3565b826001600160a01b03167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c836040516105f591815260200190565b60405180910390a250505050565b3361060d336112c5565b6106295760405162461bcd60e51b81526004016104e990611d5d565b6001600160a01b03891661067f5760405162461bcd60e51b815260206004820152601d60248201527f43616e6e6f742061646420636f6e74726163742061646472657373203000000060448201526064016104e9565b6001600160a01b038916600090815261012d602052604090205460ff166106e85760405162461bcd60e51b815260206004820152601d60248201527f436f6e747261637420686173206e6f74206265656e20616c6c6f77656400000060448201526064016104e9565b6106f1866112f8565b1561075c5760405162461bcd60e51b815260206004820152603560248201527f5374616b6520616c72656164792065786973747320666f7220746869732061736044820152741cd95d0b081c1b19585cd9481d5c19185d19481a5d605a1b60648201526084016104e9565b60006107678a61131f565b604051633649c47960e01b81529091506001600160a01b03821690633649c479906107a0908c908c908c908c908c908c90600401611e4a565b600060405180830381600087803b1580156107ba57600080fd5b505af11580156107ce573d6000803e3d6000fd5b505050506108a4878287876040805160e08101825242815260208082019485526000828401818152606084018281526080850196875260a08501838152600160c087018181526001600160a01b039c8d168087526101318852898720985189559a51918801919091559251600287015590516003860155955160048501559451600584015593516006909201805492151560ff199093169290921790915561013081528183208054959096166001600160a01b031995861681179096559482526101329094529290922080549091169091179055565b6001600160a01b0390811660009081526101326020908152604080832080549a85166001600160a01b03199b8c1617905561012e909152902080549a909116999096169890981790945550505050505050565b600082815260976020526040902060010154610912816113b9565b61091c83836113c6565b505050565b6001600160a01b03811633146109915760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016104e9565b61099b82826113e8565b5050565b336109a9336112c5565b6109c55760405162461bcd60e51b81526004016104e990611d5d565b6001600160a01b038416600090815261013160205260409020546109fb5760405162461bcd60e51b81526004016104e990611ea8565b6001600160a01b03841660009081526101316020526040812060058101805491928692610a29908490611d93565b909155505060405163a9059cbb60e01b81526001600160a01b0384811660048301526024820186905286169063a9059cbb906044016020604051808303816000875af1158015610a7d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aa19190611da6565b610abd5760405162461bcd60e51b81526004016104e990611dc3565b604080516001600160a01b038581168252602082018790528716917f4e8dab10d05a07ef957b7628e008e14816b97a8fead4810029ffede230d1e17b91015b60405180910390a25050505050565b600082815260c960205260408120610b23908361140a565b9392505050565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b33610b5f336112c5565b610b7b5760405162461bcd60e51b81526004016104e990611d5d565b6001600160a01b03841660009081526101316020526040902054610bb15760405162461bcd60e51b81526004016104e990611ea8565b6001600160a01b03848116600081815261013160205260409081902090516323b872dd60e01b8152928516600484015230602484015260448301869052916323b872dd906064016020604051808303816000875af1158015610c17573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3b9190611da6565b610c575760405162461bcd60e51b81526004016104e990611dc3565b83816005016000828254610c6b9190611ed6565b9091555050604080516001600160a01b038581168252602082018790528716917fd94415916610c60b0e0e439fd308b171a6e28fad608830cf17f14ff5928e22799101610afc565b33610cbd336112c5565b610cd95760405162461bcd60e51b81526004016104e990611d5d565b6040516370a0823160e01b81523060048201526001600160a01b0384169063a9059cbb90849083906370a0823190602401602060405180830381865afa158015610d27573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d4b9190611ee9565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af1158015610d96573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dba9190611da6565b61091c5760405162461bcd60e51b81526004016104e990611dc3565b33610de0336112c5565b610dfc5760405162461bcd60e51b81526004016104e990611d5d565b6001600160a01b038316610e525760405162461bcd60e51b815260206004820152601d60248201527f43616e6e6f742061646420636f6e74726163742061646472657373203000000060448201526064016104e9565b506001600160a01b0391909116600090815261012d60205260409020805460ff1916911515919091179055565b33610e89336112c5565b610ea55760405162461bcd60e51b81526004016104e990611d5d565b6001600160a01b03851660009081526101316020526040902054610edb5760405162461bcd60e51b81526004016104e990611ea8565b6001600160a01b03851660008181526101316020908152604091829020600181018890556004810187905560068101805487151560ff19909116811790915583518981529283018890528284015291519192917f7093a36e926ab1f412d05ee921c3689370d6897cf348f11d0a17a3965ff114c09181900360600190a2505050505050565b600054610100900460ff1615808015610f805750600054600160ff909116105b80610f9a5750303b158015610f9a575060005460ff166001145b610ffd5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016104e9565b6000805460ff191660011790558015611020576000805461ff0019166101001790555b611028611416565b61103061143f565b61103861146e565b61013380546001600160a01b0319166001600160a01b03841617905561105f6000836113c6565b6110897f97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b929836113c6565b801561099b576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15050565b600081815260c9602052604081206104be9061149d565b600082815260976020526040902060010154611104816113b9565b61091c83836113e8565b611117336112c5565b6111335760405162461bcd60e51b81526004016104e990611d5d565b6001600160a01b038316600090815261013160205260409020805461116a5760405162461bcd60e51b81526004016104e990611ea8565b8281600201600082825461117e9190611ed6565b92505081905550818160030160008282546111999190611d93565b90915550506001600160a01b0384167f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a94243646111d38486611d93565b60405190815260200160405180910390a26001600160a01b03841663a9059cbb866111fe8587611d93565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af1158015611249573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061126d9190611da6565b6112895760405162461bcd60e51b81526004016104e990611dc3565b5050505050565b60006001600160e01b03198216637965db0b60e01b14806104be57506301ffc9a760e01b6001600160e01b03198316146104be565b6001600160a01b0381811660009081526101326020526040812054909116156112f057506001919050565b506000919050565b6001600160a01b03811660009081526101316020526040812054156112f057506001919050565b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f090506001600160a01b0381166113b45760405162461bcd60e51b8152602060048201526016602482015275115490cc4c4d8dce8818dc99585d194819985a5b195960521b60448201526064016104e9565b919050565b6113c381336114a7565b50565b6113d08282611500565b600082815260c96020526040902061091c9082611586565b6113f2828261159b565b600082815260c96020526040902061091c9082611602565b6000610b238383611617565b600054610100900460ff1661143d5760405162461bcd60e51b81526004016104e990611f02565b565b600054610100900460ff166114665760405162461bcd60e51b81526004016104e990611f02565b61143d611641565b600054610100900460ff166114955760405162461bcd60e51b81526004016104e990611f02565b61143d61166f565b60006104be825490565b6114b18282610b2a565b61099b576114be816116a2565b6114c98360206116b4565b6040516020016114da929190611f4d565b60408051601f198184030181529082905262461bcd60e51b82526104e991600401611fc2565b61150a8282610b2a565b61099b5760008281526097602090815260408083206001600160a01b03851684529091529020805460ff191660011790556115423390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000610b23836001600160a01b038416611850565b6115a58282610b2a565b1561099b5760008281526097602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000610b23836001600160a01b03841661189f565b600082600001828154811061162e5761162e611fd5565b9060005260206000200154905092915050565b600054610100900460ff166116685760405162461bcd60e51b81526004016104e990611f02565b600160fb55565b600054610100900460ff166116965760405162461bcd60e51b81526004016104e990611f02565b6033805460ff19169055565b60606104be6001600160a01b03831660145b606060006116c3836002611feb565b6116ce906002611d93565b67ffffffffffffffff8111156116e6576116e6611a1d565b6040519080825280601f01601f191660200182016040528015611710576020820181803683370190505b509050600360fc1b8160008151811061172b5761172b611fd5565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061175a5761175a611fd5565b60200101906001600160f81b031916908160001a905350600061177e846002611feb565b611789906001611d93565b90505b6001811115611801576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106117bd576117bd611fd5565b1a60f81b8282815181106117d3576117d3611fd5565b60200101906001600160f81b031916908160001a90535060049490941c936117fa81612002565b905061178c565b508315610b235760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016104e9565b6000818152600183016020526040812054611897575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556104be565b5060006104be565b600081815260018301602052604081205480156119885760006118c3600183611ed6565b85549091506000906118d790600190611ed6565b905081811461193c5760008660000182815481106118f7576118f7611fd5565b906000526020600020015490508087600001848154811061191a5761191a611fd5565b6000918252602080832090910192909255918252600188019052604090208390555b855486908061194d5761194d612019565b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506104be565b60009150506104be565b6000602082840312156119a457600080fd5b81356001600160e01b031981168114610b2357600080fd5b6001600160a01b03811681146113c357600080fd5b80356113b4816119bc565b6000806000606084860312156119f157600080fd5b83356119fc816119bc565b92506020840135611a0c816119bc565b929592945050506040919091013590565b634e487b7160e01b600052604160045260246000fd5b600082601f830112611a4457600080fd5b813567ffffffffffffffff80821115611a5f57611a5f611a1d565b604051601f8301601f19908116603f01168101908282118183101715611a8757611a87611a1d565b81604052838152866020858801011115611aa057600080fd5b836020870160208301376000602085830101528094505050505092915050565b80151581146113c357600080fd5b80356113b481611ac0565b600080600080600080600080610100898b031215611af657600080fd5b611aff896119d1565b9750602089013567ffffffffffffffff80821115611b1c57600080fd5b611b288c838d01611a33565b985060408b0135915080821115611b3e57600080fd5b611b4a8c838d01611a33565b9750611b5860608c016119d1565b965060808b0135915080821115611b6e57600080fd5b50611b7b8b828c01611a33565b94505060a0890135925060c08901359150611b9860e08a01611ace565b90509295985092959890939650565b600060208284031215611bb957600080fd5b5035919050565b60008060408385031215611bd357600080fd5b823591506020830135611be5816119bc565b809150509250929050565b600060208284031215611c0257600080fd5b8135610b23816119bc565b600080600060608486031215611c2257600080fd5b8335611c2d816119bc565b9250602084013591506040840135611c44816119bc565b809150509250925092565b60008060408385031215611c6257600080fd5b50508035926020909101359150565b60008060408385031215611c8457600080fd5b8235611c8f816119bc565b91506020830135611be5816119bc565b60008060408385031215611cb257600080fd5b8235611cbd816119bc565b91506020830135611be581611ac0565b60008060008060808587031215611ce357600080fd5b8435611cee816119bc565b935060208501359250604085013591506060850135611d0c81611ac0565b939692955090935050565b60008060008060808587031215611d2d57600080fd5b8435611d38816119bc565b93506020850135611d48816119bc565b93969395505050506040820135916060013590565b60208082526006908201526510b7bbb732b960d11b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b808201808211156104be576104be611d7d565b600060208284031215611db857600080fd5b8151610b2381611ac0565b6020808252601e908201527f546f6b656e20636f756c64206e6f74206265207472616e736665727265640000604082015260600190565b60005b83811015611e15578181015183820152602001611dfd565b50506000910152565b60008151808452611e36816020860160208601611dfa565b601f01601f19169290920160200192915050565b60c081526000611e5d60c0830189611e1e565b8281036020840152611e6f8189611e1e565b6001600160a01b038816604085015283810360608501529050611e928187611e1e565b6080840195909552505060a00152949350505050565b60208082526014908201527314dd185ad948191bd95cc81b9bdd08195e1a5cdd60621b604082015260600190565b818103818111156104be576104be611d7d565b600060208284031215611efb57600080fd5b5051919050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351611f85816017850160208801611dfa565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351611fb6816028840160208801611dfa565b01602801949350505050565b602081526000610b236020830184611e1e565b634e487b7160e01b600052603260045260246000fd5b80820281158282048414176104be576104be611d7d565b60008161201157612011611d7d565b506000190190565b634e487b7160e01b600052603160045260246000fdfea2646970667358221220336d46955956b747292e11584e13127ba99df9fd86a940aa435e77576cf5d0b264736f6c63430008110033";

type StakeVaultV2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakeVaultV2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StakeVaultV2__factory extends ContractFactory {
  constructor(...args: StakeVaultV2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StakeVaultV2> {
    return super.deploy(overrides || {}) as Promise<StakeVaultV2>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): StakeVaultV2 {
    return super.attach(address) as StakeVaultV2;
  }
  override connect(signer: Signer): StakeVaultV2__factory {
    return super.connect(signer) as StakeVaultV2__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakeVaultV2Interface {
    return new utils.Interface(_abi) as StakeVaultV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakeVaultV2 {
    return new Contract(address, _abi, signerOrProvider) as StakeVaultV2;
  }
}
