/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface StakeVaultInterface extends utils.Interface {
  functions: {
    "_deposit(address,address,uint256)": FunctionFragment;
    "_withdraw(address,address,uint256,uint256)": FunctionFragment;
    "deployFunds(uint256,uint256,address)": FunctionFragment;
    "deployStake(string,string,address,string,uint256,uint256,bool)": FunctionFragment;
    "governanceRecoverUnsupported(address,address)": FunctionFragment;
    "isOperator()": FunctionFragment;
    "operator()": FunctionFragment;
    "owner()": FunctionFragment;
    "positionForAsset(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "returnDeployedFunds(uint256,uint256,address)": FunctionFragment;
    "stakeAssets(uint256)": FunctionFragment;
    "stakePositionId(address)": FunctionFragment;
    "transferOperator(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateAsset(uint256,uint256,uint256,bool)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_deposit"
      | "_withdraw"
      | "deployFunds"
      | "deployStake"
      | "governanceRecoverUnsupported"
      | "isOperator"
      | "operator"
      | "owner"
      | "positionForAsset"
      | "renounceOwnership"
      | "returnDeployedFunds"
      | "stakeAssets"
      | "stakePositionId"
      | "transferOperator"
      | "transferOwnership"
      | "updateAsset"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "_deposit",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "_withdraw",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "deployFunds",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "deployStake",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "governanceRecoverUnsupported",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isOperator",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "operator", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "positionForAsset",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "returnDeployedFunds",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "stakeAssets",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "stakePositionId",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOperator",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateAsset",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "_deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deployFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deployStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "governanceRecoverUnsupported",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isOperator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "operator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "positionForAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "returnDeployedFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakeAssets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakePositionId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateAsset",
    data: BytesLike
  ): Result;

  events: {
    "Deposit(address,uint256)": EventFragment;
    "FundsDeployed(uint256,uint256)": EventFragment;
    "FundsReturned(uint256,uint256)": EventFragment;
    "OperatorTransferred(address,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "UpdateAssetMetadata(uint256,uint256,uint256,bool)": EventFragment;
    "Withdraw(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FundsDeployed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FundsReturned"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OperatorTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateAssetMetadata"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export interface DepositEventObject {
  _token: string;
  _amount: BigNumber;
}
export type DepositEvent = TypedEvent<[string, BigNumber], DepositEventObject>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export interface FundsDeployedEventObject {
  _stakeId: BigNumber;
  _amount: BigNumber;
}
export type FundsDeployedEvent = TypedEvent<
  [BigNumber, BigNumber],
  FundsDeployedEventObject
>;

export type FundsDeployedEventFilter = TypedEventFilter<FundsDeployedEvent>;

export interface FundsReturnedEventObject {
  _stakeId: BigNumber;
  _amount: BigNumber;
}
export type FundsReturnedEvent = TypedEvent<
  [BigNumber, BigNumber],
  FundsReturnedEventObject
>;

export type FundsReturnedEventFilter = TypedEventFilter<FundsReturnedEvent>;

export interface OperatorTransferredEventObject {
  previousOperator: string;
  newOperator: string;
}
export type OperatorTransferredEvent = TypedEvent<
  [string, string],
  OperatorTransferredEventObject
>;

export type OperatorTransferredEventFilter =
  TypedEventFilter<OperatorTransferredEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface UpdateAssetMetadataEventObject {
  _stakeId: BigNumber;
  _capacity: BigNumber;
  _endTime: BigNumber;
  _active: boolean;
}
export type UpdateAssetMetadataEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, boolean],
  UpdateAssetMetadataEventObject
>;

export type UpdateAssetMetadataEventFilter =
  TypedEventFilter<UpdateAssetMetadataEvent>;

export interface WithdrawEventObject {
  _token: string;
  _amount: BigNumber;
}
export type WithdrawEvent = TypedEvent<
  [string, BigNumber],
  WithdrawEventObject
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface StakeVault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StakeVaultInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    _deposit(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    _withdraw(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _yieldEarned: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deployFunds(
      _stakeId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deployStake(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _stakeToken: PromiseOrValue<string>,
      _baseTokenURI: PromiseOrValue<string>,
      _capacity: PromiseOrValue<BigNumberish>,
      _endTime: PromiseOrValue<BigNumberish>,
      useDefaultLocks: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    governanceRecoverUnsupported(
      _token: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isOperator(overrides?: CallOverrides): Promise<[boolean]>;

    operator(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    positionForAsset(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    returnDeployedFunds(
      _stakeId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      _from: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    stakeAssets(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
      ] & {
        stakeToken: string;
        positionToken: string;
        created: BigNumber;
        capacity: BigNumber;
        stakedAmount: BigNumber;
        yieldEarned: BigNumber;
        endTime: BigNumber;
        deployedAmount: BigNumber;
        active: boolean;
      }
    >;

    stakePositionId(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    transferOperator(
      newOperator_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateAsset(
      _stakeId: PromiseOrValue<BigNumberish>,
      _capacity: PromiseOrValue<BigNumberish>,
      _endTime: PromiseOrValue<BigNumberish>,
      _active: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  _deposit(
    _user: PromiseOrValue<string>,
    _token: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  _withdraw(
    _user: PromiseOrValue<string>,
    _token: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _yieldEarned: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deployFunds(
    _stakeId: PromiseOrValue<BigNumberish>,
    _amount: PromiseOrValue<BigNumberish>,
    _to: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deployStake(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _stakeToken: PromiseOrValue<string>,
    _baseTokenURI: PromiseOrValue<string>,
    _capacity: PromiseOrValue<BigNumberish>,
    _endTime: PromiseOrValue<BigNumberish>,
    useDefaultLocks: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  governanceRecoverUnsupported(
    _token: PromiseOrValue<string>,
    _to: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isOperator(overrides?: CallOverrides): Promise<boolean>;

  operator(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  positionForAsset(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  returnDeployedFunds(
    _stakeId: PromiseOrValue<BigNumberish>,
    _amount: PromiseOrValue<BigNumberish>,
    _from: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  stakeAssets(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [
      string,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      boolean
    ] & {
      stakeToken: string;
      positionToken: string;
      created: BigNumber;
      capacity: BigNumber;
      stakedAmount: BigNumber;
      yieldEarned: BigNumber;
      endTime: BigNumber;
      deployedAmount: BigNumber;
      active: boolean;
    }
  >;

  stakePositionId(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  transferOperator(
    newOperator_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateAsset(
    _stakeId: PromiseOrValue<BigNumberish>,
    _capacity: PromiseOrValue<BigNumberish>,
    _endTime: PromiseOrValue<BigNumberish>,
    _active: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    _deposit(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    _withdraw(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _yieldEarned: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    deployFunds(
      _stakeId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    deployStake(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _stakeToken: PromiseOrValue<string>,
      _baseTokenURI: PromiseOrValue<string>,
      _capacity: PromiseOrValue<BigNumberish>,
      _endTime: PromiseOrValue<BigNumberish>,
      useDefaultLocks: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    governanceRecoverUnsupported(
      _token: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    isOperator(overrides?: CallOverrides): Promise<boolean>;

    operator(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    positionForAsset(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    returnDeployedFunds(
      _stakeId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      _from: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    stakeAssets(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
      ] & {
        stakeToken: string;
        positionToken: string;
        created: BigNumber;
        capacity: BigNumber;
        stakedAmount: BigNumber;
        yieldEarned: BigNumber;
        endTime: BigNumber;
        deployedAmount: BigNumber;
        active: boolean;
      }
    >;

    stakePositionId(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOperator(
      newOperator_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateAsset(
      _stakeId: PromiseOrValue<BigNumberish>,
      _capacity: PromiseOrValue<BigNumberish>,
      _endTime: PromiseOrValue<BigNumberish>,
      _active: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Deposit(address,uint256)"(
      _token?: PromiseOrValue<string> | null,
      _amount?: null
    ): DepositEventFilter;
    Deposit(
      _token?: PromiseOrValue<string> | null,
      _amount?: null
    ): DepositEventFilter;

    "FundsDeployed(uint256,uint256)"(
      _stakeId?: PromiseOrValue<BigNumberish> | null,
      _amount?: null
    ): FundsDeployedEventFilter;
    FundsDeployed(
      _stakeId?: PromiseOrValue<BigNumberish> | null,
      _amount?: null
    ): FundsDeployedEventFilter;

    "FundsReturned(uint256,uint256)"(
      _stakeId?: PromiseOrValue<BigNumberish> | null,
      _amount?: null
    ): FundsReturnedEventFilter;
    FundsReturned(
      _stakeId?: PromiseOrValue<BigNumberish> | null,
      _amount?: null
    ): FundsReturnedEventFilter;

    "OperatorTransferred(address,address)"(
      previousOperator?: PromiseOrValue<string> | null,
      newOperator?: PromiseOrValue<string> | null
    ): OperatorTransferredEventFilter;
    OperatorTransferred(
      previousOperator?: PromiseOrValue<string> | null,
      newOperator?: PromiseOrValue<string> | null
    ): OperatorTransferredEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "UpdateAssetMetadata(uint256,uint256,uint256,bool)"(
      _stakeId?: PromiseOrValue<BigNumberish> | null,
      _capacity?: null,
      _endTime?: null,
      _active?: null
    ): UpdateAssetMetadataEventFilter;
    UpdateAssetMetadata(
      _stakeId?: PromiseOrValue<BigNumberish> | null,
      _capacity?: null,
      _endTime?: null,
      _active?: null
    ): UpdateAssetMetadataEventFilter;

    "Withdraw(address,uint256)"(
      _token?: PromiseOrValue<string> | null,
      _amount?: null
    ): WithdrawEventFilter;
    Withdraw(
      _token?: PromiseOrValue<string> | null,
      _amount?: null
    ): WithdrawEventFilter;
  };

  estimateGas: {
    _deposit(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    _withdraw(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _yieldEarned: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deployFunds(
      _stakeId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deployStake(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _stakeToken: PromiseOrValue<string>,
      _baseTokenURI: PromiseOrValue<string>,
      _capacity: PromiseOrValue<BigNumberish>,
      _endTime: PromiseOrValue<BigNumberish>,
      useDefaultLocks: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    governanceRecoverUnsupported(
      _token: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isOperator(overrides?: CallOverrides): Promise<BigNumber>;

    operator(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    positionForAsset(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    returnDeployedFunds(
      _stakeId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      _from: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    stakeAssets(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    stakePositionId(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOperator(
      newOperator_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateAsset(
      _stakeId: PromiseOrValue<BigNumberish>,
      _capacity: PromiseOrValue<BigNumberish>,
      _endTime: PromiseOrValue<BigNumberish>,
      _active: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _deposit(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    _withdraw(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _yieldEarned: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deployFunds(
      _stakeId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deployStake(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _stakeToken: PromiseOrValue<string>,
      _baseTokenURI: PromiseOrValue<string>,
      _capacity: PromiseOrValue<BigNumberish>,
      _endTime: PromiseOrValue<BigNumberish>,
      useDefaultLocks: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    governanceRecoverUnsupported(
      _token: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isOperator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    operator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    positionForAsset(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    returnDeployedFunds(
      _stakeId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      _from: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    stakeAssets(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    stakePositionId(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOperator(
      newOperator_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateAsset(
      _stakeId: PromiseOrValue<BigNumberish>,
      _capacity: PromiseOrValue<BigNumberish>,
      _endTime: PromiseOrValue<BigNumberish>,
      _active: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
