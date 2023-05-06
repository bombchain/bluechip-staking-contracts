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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface IStakeVaultInterface extends utils.Interface {
  functions: {
    "_deposit(address,address,uint256)": FunctionFragment;
    "_updateUserBonus(address,address,uint256,uint256,uint256,bool)": FunctionFragment;
    "_withdraw(address,address,uint256,uint256)": FunctionFragment;
    "admin()": FunctionFragment;
    "stakePositionData(address)": FunctionFragment;
    "usersBonus(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_deposit"
      | "_updateUserBonus"
      | "_withdraw"
      | "admin"
      | "stakePositionData"
      | "usersBonus"
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
    functionFragment: "_updateUserBonus",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>
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
  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "stakePositionData",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "usersBonus",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "_deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "_updateUserBonus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_withdraw", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stakePositionData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "usersBonus", data: BytesLike): Result;

  events: {};
}

export interface IStakeVault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IStakeVaultInterface;

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

    _updateUserBonus(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _bonusAmount: PromiseOrValue<BigNumberish>,
      _bonusCreated: PromiseOrValue<BigNumberish>,
      _stakingDeposits: PromiseOrValue<BigNumberish>,
      _referralBonus: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    _withdraw(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _yieldEarned: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    admin(overrides?: CallOverrides): Promise<[string]>;

    stakePositionData(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
      ]
    >;

    usersBonus(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber, BigNumber, BigNumber, boolean]>;
  };

  _deposit(
    _user: PromiseOrValue<string>,
    _token: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  _updateUserBonus(
    _user: PromiseOrValue<string>,
    _token: PromiseOrValue<string>,
    _bonusAmount: PromiseOrValue<BigNumberish>,
    _bonusCreated: PromiseOrValue<BigNumberish>,
    _stakingDeposits: PromiseOrValue<BigNumberish>,
    _referralBonus: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  _withdraw(
    _user: PromiseOrValue<string>,
    _token: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _yieldEarned: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  admin(overrides?: CallOverrides): Promise<string>;

  stakePositionData(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      boolean
    ]
  >;

  usersBonus(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber, BigNumber, BigNumber, boolean]>;

  callStatic: {
    _deposit(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    _updateUserBonus(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _bonusAmount: PromiseOrValue<BigNumberish>,
      _bonusCreated: PromiseOrValue<BigNumberish>,
      _stakingDeposits: PromiseOrValue<BigNumberish>,
      _referralBonus: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    _withdraw(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _yieldEarned: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    admin(overrides?: CallOverrides): Promise<string>;

    stakePositionData(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
      ]
    >;

    usersBonus(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber, BigNumber, BigNumber, boolean]>;
  };

  filters: {};

  estimateGas: {
    _deposit(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    _updateUserBonus(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _bonusAmount: PromiseOrValue<BigNumberish>,
      _bonusCreated: PromiseOrValue<BigNumberish>,
      _stakingDeposits: PromiseOrValue<BigNumberish>,
      _referralBonus: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    _withdraw(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _yieldEarned: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    admin(overrides?: CallOverrides): Promise<BigNumber>;

    stakePositionData(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    usersBonus(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _deposit(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    _updateUserBonus(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _bonusAmount: PromiseOrValue<BigNumberish>,
      _bonusCreated: PromiseOrValue<BigNumberish>,
      _stakingDeposits: PromiseOrValue<BigNumberish>,
      _referralBonus: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    _withdraw(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _yieldEarned: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    admin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    stakePositionData(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    usersBonus(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
