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

export declare namespace CZYVester {
  export type TokenVestStruct = {
    start: PromiseOrValue<BigNumberish>;
    end: PromiseOrValue<BigNumberish>;
    totalWithdraws: PromiseOrValue<BigNumberish>;
    withdrawsCompleted: PromiseOrValue<BigNumberish>;
    amount: PromiseOrValue<BigNumberish>;
  };

  export type TokenVestStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    start: BigNumber;
    end: BigNumber;
    totalWithdraws: BigNumber;
    withdrawsCompleted: BigNumber;
    amount: BigNumber;
  };
}

export interface CZYVesterInterface extends utils.Interface {
  functions: {
    "addStakingContract(address)": FunctionFragment;
    "createVest(address,uint256)": FunctionFragment;
    "fullyVestedPeriod()": FunctionFragment;
    "getCZY()": FunctionFragment;
    "getUserVests(address)": FunctionFragment;
    "getWithdrawsAllowed(address,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "stakeContracts(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "vests(address,uint256)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
    "withdrawsPerPeriod()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addStakingContract"
      | "createVest"
      | "fullyVestedPeriod"
      | "getCZY"
      | "getUserVests"
      | "getWithdrawsAllowed"
      | "owner"
      | "renounceOwnership"
      | "stakeContracts"
      | "transferOwnership"
      | "vests"
      | "withdraw"
      | "withdrawsPerPeriod"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addStakingContract",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "createVest",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "fullyVestedPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getCZY", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getUserVests",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getWithdrawsAllowed",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stakeContracts",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "vests",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawsPerPeriod",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "addStakingContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createVest", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "fullyVestedPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getCZY", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getUserVests",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWithdrawsAllowed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakeContracts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vests", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawsPerPeriod",
    data: BytesLike
  ): Result;

  events: {
    "CreateVest(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Withdraw(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CreateVest"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export interface CreateVestEventObject {
  user: string;
  amount: BigNumber;
}
export type CreateVestEvent = TypedEvent<
  [string, BigNumber],
  CreateVestEventObject
>;

export type CreateVestEventFilter = TypedEventFilter<CreateVestEvent>;

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

export interface WithdrawEventObject {
  user: string;
  index: BigNumber;
  amountWithdrawn: BigNumber;
}
export type WithdrawEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  WithdrawEventObject
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface CZYVester extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CZYVesterInterface;

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
    addStakingContract(
      _contract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createVest(
      _user: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fullyVestedPeriod(overrides?: CallOverrides): Promise<[BigNumber]>;

    getCZY(overrides?: CallOverrides): Promise<[string]>;

    getUserVests(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[CZYVester.TokenVestStructOutput[]]>;

    getWithdrawsAllowed(
      _user: PromiseOrValue<string>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    stakeContracts(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    vests(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        start: BigNumber;
        end: BigNumber;
        totalWithdraws: BigNumber;
        withdrawsCompleted: BigNumber;
        amount: BigNumber;
      }
    >;

    withdraw(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawsPerPeriod(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  addStakingContract(
    _contract: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createVest(
    _user: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fullyVestedPeriod(overrides?: CallOverrides): Promise<BigNumber>;

  getCZY(overrides?: CallOverrides): Promise<string>;

  getUserVests(
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<CZYVester.TokenVestStructOutput[]>;

  getWithdrawsAllowed(
    _user: PromiseOrValue<string>,
    _index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  stakeContracts(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  vests(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      start: BigNumber;
      end: BigNumber;
      totalWithdraws: BigNumber;
      withdrawsCompleted: BigNumber;
      amount: BigNumber;
    }
  >;

  withdraw(
    _index: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawsPerPeriod(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    addStakingContract(
      _contract: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    createVest(
      _user: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    fullyVestedPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    getCZY(overrides?: CallOverrides): Promise<string>;

    getUserVests(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<CZYVester.TokenVestStructOutput[]>;

    getWithdrawsAllowed(
      _user: PromiseOrValue<string>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    stakeContracts(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    vests(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        start: BigNumber;
        end: BigNumber;
        totalWithdraws: BigNumber;
        withdrawsCompleted: BigNumber;
        amount: BigNumber;
      }
    >;

    withdraw(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawsPerPeriod(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "CreateVest(address,uint256)"(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): CreateVestEventFilter;
    CreateVest(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): CreateVestEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "Withdraw(address,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      index?: null,
      amountWithdrawn?: null
    ): WithdrawEventFilter;
    Withdraw(
      user?: PromiseOrValue<string> | null,
      index?: null,
      amountWithdrawn?: null
    ): WithdrawEventFilter;
  };

  estimateGas: {
    addStakingContract(
      _contract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createVest(
      _user: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fullyVestedPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    getCZY(overrides?: CallOverrides): Promise<BigNumber>;

    getUserVests(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWithdrawsAllowed(
      _user: PromiseOrValue<string>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    stakeContracts(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    vests(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawsPerPeriod(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    addStakingContract(
      _contract: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createVest(
      _user: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fullyVestedPeriod(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCZY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getUserVests(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getWithdrawsAllowed(
      _user: PromiseOrValue<string>,
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    stakeContracts(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    vests(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawsPerPeriod(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
