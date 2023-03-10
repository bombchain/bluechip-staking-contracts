/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ICZYVester,
  ICZYVesterInterface,
} from "../../../contracts/interfaces/ICZYVester";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "createVest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ICZYVester__factory {
  static readonly abi = _abi;
  static createInterface(): ICZYVesterInterface {
    return new utils.Interface(_abi) as ICZYVesterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ICZYVester {
    return new Contract(address, _abi, signerOrProvider) as ICZYVester;
  }
}
