/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  StakeRewards,
  StakeRewardsInterface,
} from "../../contracts/StakeRewards";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_czy",
        type: "address",
      },
      {
        internalType: "address",
        name: "_dexRouter",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AddShares",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "ClaimReward",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountTokens",
        type: "uint256",
      },
    ],
    name: "DepositRewards",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DistributeReward",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RemoveShares",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_compound",
        type: "bool",
      },
    ],
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "compoundBuySlippage",
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
    inputs: [],
    name: "czy",
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
    name: "depositRewards",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getShares",
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
        internalType: "address",
        name: "shareholder",
        type: "address",
      },
    ],
    name: "getUnpaid",
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
    inputs: [],
    name: "getsCZY",
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
    name: "getslCZY",
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
    name: "owner",
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
    name: "renounceOwnership",
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
    name: "rewards",
    outputs: [
      {
        internalType: "uint256",
        name: "totalExcluded",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalRealised",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardsPerShare",
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
        internalType: "uint8",
        name: "_slippage",
        type: "uint8",
      },
    ],
    name: "setCompoundBuySlippage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "shareholder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balanceUpdate",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isRemoving",
        type: "bool",
      },
    ],
    name: "setShare",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sCZY",
        type: "address",
      },
    ],
    name: "setsCZY",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_slCZY",
        type: "address",
      },
    ],
    name: "setslCZY",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDistributed",
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
    inputs: [],
    name: "totalRewards",
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
    inputs: [],
    name: "totalSharesDeposited",
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
    inputs: [],
    name: "totalStakedUsers",
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
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260026005553480156200001657600080fd5b506040516200165c3803806200165c8339810160408190526200003991620000e3565b620000443362000076565b600180546001600160a01b039384166001600160a01b031991821617909155600480549290931691161790556200011b565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b0381168114620000de57600080fd5b919050565b60008060408385031215620000f757600080fd5b6200010283620000c6565b91506200011260208401620000c6565b90509250929050565b611531806200012b6000396000f3fe60806040526004361061012a5760003560e01c806380bb4055116100ab578063c5a0ffd71161006f578063c5a0ffd714610310578063c7e1d0b114610330578063efca2eed14610346578063f04da65b1461035c578063f2fde38b14610392578063f36adc35146103b257600080fd5b806380bb40551461027e57806382b542ce1461029457806389d96917146102b45780638da5cb5b146102d4578063aa836b29146102f257600080fd5b806329cc05cf116100f257806329cc05cf146101fd5780633c6e67891461021d5780634b6606c4146102335780634eb2e07d14610253578063715018a61461026957600080fd5b80630700037d1461012f57806309e266361461017d5780630d56d0581461019f5780630e15561a146101d1578063152111f7146101f5575b600080fd5b34801561013b57600080fd5b5061016361014a3660046111e0565b6009602052600090815260409020805460019091015482565b604080519283526020830191909152015b60405180910390f35b34801561018957600080fd5b5061019d6101983660046111e0565b6103d2565b005b3480156101ab57600080fd5b506002546001600160a01b03165b6040516001600160a01b039091168152602001610174565b3480156101dd57600080fd5b506101e7600a5481565b604051908152602001610174565b61019d6103fc565b34801561020957600080fd5b5061019d610218366004611219565b610548565b34801561022957600080fd5b506101e760075481565b34801561023f57600080fd5b506001546101b9906001600160a01b031681565b34801561025f57600080fd5b506101e760055481565b34801561027557600080fd5b5061019d61064f565b34801561028a57600080fd5b506101e760065481565b3480156102a057600080fd5b5061019d6102af3660046111e0565b610663565b3480156102c057600080fd5b506101e76102cf3660046111e0565b61068d565b3480156102e057600080fd5b506000546001600160a01b03166101b9565b3480156102fe57600080fd5b506003546001600160a01b03166101b9565b34801561031c57600080fd5b5061019d61032b366004611257565b610715565b34801561033c57600080fd5b506101e7600c5481565b34801561035257600080fd5b506101e7600b5481565b34801561036857600080fd5b506101e76103773660046111e0565b6001600160a01b031660009081526008602052604090205490565b34801561039e57600080fd5b5061019d6103ad3660046111e0565b610755565b3480156103be57600080fd5b5061019d6103cd366004611272565b6107ce565b6103da61083c565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b348061045f5760405162461bcd60e51b815260206004820152602760248201527f6d7573742070726f766964652045544820746f206465706f73697420666f72206044820152667265776172647360c81b60648201526084015b60405180910390fd5b6000600754116104bd5760405162461bcd60e51b8152602060048201526024808201527f6d7573742062652073686172657320746f2064697374726962757465207265776044820152636172647360e01b6064820152608401610456565b80600a60008282546104cf91906112ab565b90915550506007546104f0826ec097ce7bc90715b34b9f10000000006112be565b6104fa91906112d5565b600c600082825461050b91906112ab565b909155505060405181815233907fb9ad861b752f80117b35bea6dec99933d8a5ae360f2839ee8784b750d56134099060200160405180910390a250565b6002546001600160a01b031633148061056b57506003546001600160a01b031633145b6105ad5760405162461bcd60e51b815260206004820152601360248201527236bab9ba1031329039ba30b5b2903a37b5b2b760691b6044820152606401610456565b8015610605576105bd8383610896565b826001600160a01b03167fae0577e1c96b26fbc0b9df702431f5470979d001d24f136eded791b8b6521d6f836040516105f891815260200190565b60405180910390a2505050565b61060f83836109fa565b826001600160a01b03167fba8f3777cf908803bf1f3dd58e7f4b7d3de4dbe3c234c4ccab0975d98f7cd388836040516105f891815260200190565b505050565b61065761083c565b6106616000610b02565b565b61066b61083c565b600380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811660009081526008602052604081205481036106b457506000919050565b6001600160a01b0382166000908152600860205260408120546106d690610b52565b6001600160a01b038416600090815260096020526040902054909150808211610703575060009392505050565b61070d81836112f7565b949350505050565b61071f3382610b82565b6040513381527f63e32091e4445d16e29c33a6b264577c2d86694021aa4e6f4dd590048f5792e89060200160405180910390a150565b61075d61083c565b6001600160a01b0381166107c25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610456565b6107cb81610b02565b50565b6107d661083c565b60648160ff1611156108345760405162461bcd60e51b815260206004820152602160248201527f63616e6e6f74206265206d6f7265207468616e203130302520736c69707061676044820152606560f81b6064820152608401610456565b60ff16600555565b6000546001600160a01b031633146106615760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610456565b6001600160a01b038216600090815260086020526040902054158015906108dd57508015806108dd57506001600160a01b0382166000908152600860205260409020548111155b61093e5760405162461bcd60e51b815260206004820152602c60248201527f796f752063616e206f6e6c7920756e7374616b6520696620796f75206861766560448201526b081cdbdb59481cdd185ad95960a21b6064820152608401610456565b610949826000610b82565b600081156109575781610971565b6001600160a01b0383166000908152600860205260409020545b9050806007600082825461098591906112f7565b90915550506001600160a01b038316600090815260086020526040812080548392906109b29084906112f7565b90915550506001600160a01b0383166000908152600860205260409020546109d990610b52565b6001600160a01b039093166000908152600960205260409020929092555050565b6001600160a01b03821660009081526008602052604090205415610a2357610a23826000610b82565b6001600160a01b0382166000908152600860205260408120546007805491928492610a4f9084906112ab565b90915550506001600160a01b03831660009081526008602052604081208054849290610a7c9084906112ab565b90915550506001600160a01b03831660009081526008602052604090204260019091015580158015610ac557506001600160a01b03831660009081526008602052604090205415155b15610ae05760068054906000610ada8361130a565b91905055505b6001600160a01b0383166000908152600860205260409020546109d990610b52565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006ec097ce7bc90715b34b9f1000000000600c5483610b7291906112be565b610b7c91906112d5565b92915050565b6001600160a01b0382166000908152600860205260408120549003610ba5575050565b6000610bb08361068d565b6001600160a01b038416600090815260096020526040812060010180549293508392909190610be09084906112ab565b90915550506001600160a01b038316600090815260086020526040902054610c0790610b52565b6001600160a01b038416600090815260096020526040902055801561064a5780600b6000828254610c3891906112ab565b909155504790508215610ddc576000610c5083610ec0565b6040805160028082526060820183529293506000929091602083019080368337505060048054604080516315ab88c960e31b815290519495506001600160a01b039091169363ad5c46489350818301926020928290030181865afa158015610cbc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ce09190611339565b81600081518110610cf357610cf3611356565b6001600160a01b0392831660209182029290920101526001805483519216918391908110610d2357610d23611356565b6001600160a01b039283166020918202929092010152600454600554911690637ff36ab5908690606490610d5790826112f7565b610d6190876112be565b610d6b91906112d5565b848a426040518663ffffffff1660e01b8152600401610d8d949392919061136c565b60006040518083038185885af1158015610dab573d6000803e3d6000fd5b50505050506040513d6000823e601f3d908101601f19168201604052610dd491908101906113d6565b505050610e2e565b6040516001600160a01b038516908390600081818185875af1925050503d8060008114610e25576040519150601f19603f3d011682016040523d82523d6000602084013e610e2a565b606091505b5050505b610e3882826112f7565b471015610e775760405162461bcd60e51b815260206004820152600d60248201526c0e8deded640e8dede40daeac6d609b1b6044820152606401610456565b836001600160a01b03167fe8b160e373db99a103e0a2abfa029b9c3fc8b328984a1ead8a65ae68ae646db783604051610eb291815260200190565b60405180910390a250505050565b600480546040805163c45a015560e01b8152905160009384936001600160a01b03169263c45a015592818301926020928290030181865afa158015610f09573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f2d9190611339565b6001600160a01b031663e6a43905600460009054906101000a90046001600160a01b03166001600160a01b031663ad5c46486040518163ffffffff1660e01b8152600401602060405180830381865afa158015610f8e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fb29190611339565b60015460405160e084901b6001600160e01b03191681526001600160a01b03928316600482015291166024820152604401602060405180830381865afa158015611000573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110249190611339565b90506000819050600080826001600160a01b0316630902f1ac6040518163ffffffff1660e01b8152600401606060405180830381865afa15801561106c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061109091906114ab565b5060048054604080516315ab88c960e31b815290519496509294506001600160a01b03169263ad5c46489280830192602092918290030181865afa1580156110dc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111009190611339565b6001600160a01b0316836001600160a01b0316630dfe16816040518163ffffffff1660e01b8152600401602060405180830381865afa158015611147573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061116b9190611339565b6001600160a01b0316036111ac57816001600160701b0316816001600160701b03168761119891906112be565b6111a291906112d5565b9695505050505050565b806001600160701b0316826001600160701b03168761119891906112be565b6001600160a01b03811681146107cb57600080fd5b6000602082840312156111f257600080fd5b81356111fd816111cb565b9392505050565b8035801515811461121457600080fd5b919050565b60008060006060848603121561122e57600080fd5b8335611239816111cb565b92506020840135915061124e60408501611204565b90509250925092565b60006020828403121561126957600080fd5b6111fd82611204565b60006020828403121561128457600080fd5b813560ff811681146111fd57600080fd5b634e487b7160e01b600052601160045260246000fd5b80820180821115610b7c57610b7c611295565b8082028115828204841417610b7c57610b7c611295565b6000826112f257634e487b7160e01b600052601260045260246000fd5b500490565b81810381811115610b7c57610b7c611295565b60006001820161131c5761131c611295565b5060010190565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561134b57600080fd5b81516111fd816111cb565b634e487b7160e01b600052603260045260246000fd5b600060808201868352602060808185015281875180845260a086019150828901935060005b818110156113b65784516001600160a01b031683529383019391830191600101611391565b50506001600160a01b039690961660408501525050506060015292915050565b600060208083850312156113e957600080fd5b825167ffffffffffffffff8082111561140157600080fd5b818501915085601f83011261141557600080fd5b81518181111561142757611427611323565b8060051b604051601f19603f8301168101818110858211171561144c5761144c611323565b60405291825284820192508381018501918883111561146a57600080fd5b938501935b828510156114885784518452938501939285019261146f565b98975050505050505050565b80516001600160701b038116811461121457600080fd5b6000806000606084860312156114c057600080fd5b6114c984611494565b92506114d760208501611494565b9150604084015163ffffffff811681146114f057600080fd5b80915050925092509256fea264697066735822122015a8436d5050be9fc791318c4a96d3ca2124bc67b4d3294ec1a40e7d96f7210464736f6c63430008110033";

type StakeRewardsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakeRewardsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StakeRewards__factory extends ContractFactory {
  constructor(...args: StakeRewardsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _czy: PromiseOrValue<string>,
    _dexRouter: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StakeRewards> {
    return super.deploy(
      _czy,
      _dexRouter,
      overrides || {}
    ) as Promise<StakeRewards>;
  }
  override getDeployTransaction(
    _czy: PromiseOrValue<string>,
    _dexRouter: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_czy, _dexRouter, overrides || {});
  }
  override attach(address: string): StakeRewards {
    return super.attach(address) as StakeRewards;
  }
  override connect(signer: Signer): StakeRewards__factory {
    return super.connect(signer) as StakeRewards__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakeRewardsInterface {
    return new utils.Interface(_abi) as StakeRewardsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakeRewards {
    return new Contract(address, _abi, signerOrProvider) as StakeRewards;
  }
}