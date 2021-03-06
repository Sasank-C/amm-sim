/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
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
} from "../../../common";

export interface ExampleComputeLiquidityValueInterface extends utils.Interface {
  functions: {
    "factory()": FunctionFragment;
    "getGasCostOfGetLiquidityValueAfterArbitrageToPrice(address,address,uint256,uint256,uint256)": FunctionFragment;
    "getLiquidityValue(address,address,uint256)": FunctionFragment;
    "getLiquidityValueAfterArbitrageToPrice(address,address,uint256,uint256,uint256)": FunctionFragment;
    "getReservesAfterArbitrage(address,address,uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "factory"
      | "getGasCostOfGetLiquidityValueAfterArbitrageToPrice"
      | "getLiquidityValue"
      | "getLiquidityValueAfterArbitrageToPrice"
      | "getReservesAfterArbitrage"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getGasCostOfGetLiquidityValueAfterArbitrageToPrice",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getLiquidityValue",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getLiquidityValueAfterArbitrageToPrice",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getReservesAfterArbitrage",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getGasCostOfGetLiquidityValueAfterArbitrageToPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLiquidityValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLiquidityValueAfterArbitrageToPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getReservesAfterArbitrage",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ExampleComputeLiquidityValue extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ExampleComputeLiquidityValueInterface;

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
    factory(overrides?: CallOverrides): Promise<[string]>;

    getGasCostOfGetLiquidityValueAfterArbitrageToPrice(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      truePriceTokenA: PromiseOrValue<BigNumberish>,
      truePriceTokenB: PromiseOrValue<BigNumberish>,
      liquidityAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getLiquidityValue(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      liquidityAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        tokenAAmount: BigNumber;
        tokenBAmount: BigNumber;
      }
    >;

    getLiquidityValueAfterArbitrageToPrice(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      truePriceTokenA: PromiseOrValue<BigNumberish>,
      truePriceTokenB: PromiseOrValue<BigNumberish>,
      liquidityAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        tokenAAmount: BigNumber;
        tokenBAmount: BigNumber;
      }
    >;

    getReservesAfterArbitrage(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      truePriceTokenA: PromiseOrValue<BigNumberish>,
      truePriceTokenB: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { reserveA: BigNumber; reserveB: BigNumber }
    >;
  };

  factory(overrides?: CallOverrides): Promise<string>;

  getGasCostOfGetLiquidityValueAfterArbitrageToPrice(
    tokenA: PromiseOrValue<string>,
    tokenB: PromiseOrValue<string>,
    truePriceTokenA: PromiseOrValue<BigNumberish>,
    truePriceTokenB: PromiseOrValue<BigNumberish>,
    liquidityAmount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getLiquidityValue(
    tokenA: PromiseOrValue<string>,
    tokenB: PromiseOrValue<string>,
    liquidityAmount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      tokenAAmount: BigNumber;
      tokenBAmount: BigNumber;
    }
  >;

  getLiquidityValueAfterArbitrageToPrice(
    tokenA: PromiseOrValue<string>,
    tokenB: PromiseOrValue<string>,
    truePriceTokenA: PromiseOrValue<BigNumberish>,
    truePriceTokenB: PromiseOrValue<BigNumberish>,
    liquidityAmount: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      tokenAAmount: BigNumber;
      tokenBAmount: BigNumber;
    }
  >;

  getReservesAfterArbitrage(
    tokenA: PromiseOrValue<string>,
    tokenB: PromiseOrValue<string>,
    truePriceTokenA: PromiseOrValue<BigNumberish>,
    truePriceTokenB: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { reserveA: BigNumber; reserveB: BigNumber }
  >;

  callStatic: {
    factory(overrides?: CallOverrides): Promise<string>;

    getGasCostOfGetLiquidityValueAfterArbitrageToPrice(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      truePriceTokenA: PromiseOrValue<BigNumberish>,
      truePriceTokenB: PromiseOrValue<BigNumberish>,
      liquidityAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLiquidityValue(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      liquidityAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        tokenAAmount: BigNumber;
        tokenBAmount: BigNumber;
      }
    >;

    getLiquidityValueAfterArbitrageToPrice(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      truePriceTokenA: PromiseOrValue<BigNumberish>,
      truePriceTokenB: PromiseOrValue<BigNumberish>,
      liquidityAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        tokenAAmount: BigNumber;
        tokenBAmount: BigNumber;
      }
    >;

    getReservesAfterArbitrage(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      truePriceTokenA: PromiseOrValue<BigNumberish>,
      truePriceTokenB: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { reserveA: BigNumber; reserveB: BigNumber }
    >;
  };

  filters: {};

  estimateGas: {
    factory(overrides?: CallOverrides): Promise<BigNumber>;

    getGasCostOfGetLiquidityValueAfterArbitrageToPrice(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      truePriceTokenA: PromiseOrValue<BigNumberish>,
      truePriceTokenB: PromiseOrValue<BigNumberish>,
      liquidityAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLiquidityValue(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      liquidityAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLiquidityValueAfterArbitrageToPrice(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      truePriceTokenA: PromiseOrValue<BigNumberish>,
      truePriceTokenB: PromiseOrValue<BigNumberish>,
      liquidityAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getReservesAfterArbitrage(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      truePriceTokenA: PromiseOrValue<BigNumberish>,
      truePriceTokenB: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getGasCostOfGetLiquidityValueAfterArbitrageToPrice(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      truePriceTokenA: PromiseOrValue<BigNumberish>,
      truePriceTokenB: PromiseOrValue<BigNumberish>,
      liquidityAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLiquidityValue(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      liquidityAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLiquidityValueAfterArbitrageToPrice(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      truePriceTokenA: PromiseOrValue<BigNumberish>,
      truePriceTokenB: PromiseOrValue<BigNumberish>,
      liquidityAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getReservesAfterArbitrage(
      tokenA: PromiseOrValue<string>,
      tokenB: PromiseOrValue<string>,
      truePriceTokenA: PromiseOrValue<BigNumberish>,
      truePriceTokenB: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
