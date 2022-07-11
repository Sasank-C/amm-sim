import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Wallet, BigNumber, BigNumberish } from 'ethers';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { UniswapV2Factory, UniswapV2Router02  } from "../typechain-types";
import { ERC20 } from "../typechain-types/contracts/test";
import { ERC20__factory } from "../typechain-types/factories/contracts/test";
import { Address } from "cluster";
import { keccak256 } from '@ethersproject/solidity'
import { parseEther } from "ethers/lib/utils";

// const MANUAL_INIT_CODE_HASH = keccak256(['bytes'],["bytecode"]);
// console.log(MANUAL_INIT_CODE_HASH)

describe("Part 1", function () {

  //let tokenFactory;
  let token0: ERC20;
  let token1: ERC20;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let router: Contract;
  let pair: Contract;

  beforeEach(async function () {

    [owner, addr1, addr2] = await ethers.getSigners();

    const tokenFactory = (await ethers.getContractFactory("contracts/test/ERC20.sol:ERC20", owner)) as ERC20__factory;
    const totalSupply = (10 ** 9).toString();
    token0 = await tokenFactory.deploy(ethers.utils.parseEther(totalSupply)); //token
    token1 = await tokenFactory.deploy(ethers.utils.parseEther(totalSupply)); //WETH
    //console.log(token0.address);
    //console.log(token1.address);
    const pairFactory = await (await ethers.getContractFactory("UniswapV2Factory", owner)).deploy(owner.address);
    await pairFactory.deployed();
    //console.log(pairFactory.address);
    router = await (await ethers.getContractFactory("UniswapV2Router02", owner)).deploy(pairFactory.address, token1.address);
    await router.deployed();
    //console.log(router.address);
    await pairFactory.createPair(token0.address, token1.address);
    const pairAddress = await pairFactory.getPair(token0.address, token1.address);
    pair = await ethers.getContractAt("UniswapV2Pair", pairAddress, owner);
    //console.log(pair.address)

    //Transfer tokens to pair
    await token0.transfer(pairAddress, parseEther("1000"));
    await token1.transfer(pairAddress, parseEther("1"));

    //Transfer tokens to addresses
    await token0.transfer(addr1.address, parseEther("1000000"));
    await token0.transfer(addr2.address, parseEther("1000000"));

    await token1.transfer(addr1.address, parseEther("1000"));
    await token1.transfer(addr2.address, parseEther("1000"));

    //Approve tokens
    await token0.connect(owner).approve(router.address, parseEther("999999999"));
    await token1.connect(owner).approve(router.address, parseEther("999999999"));
    await token0.connect(addr1).approve(router.address, parseEther("999999999"));
    await token1.connect(addr1).approve(router.address, parseEther("999999999"));
    await token0.connect(addr2).approve(router.address, parseEther("999999999"));
    await token1.connect(addr2).approve(router.address, parseEther("999999999"));

    await addLiquidity(owner, parseEther("1000000"), parseEther("1000")); //adding to circumvent line 121 of UniswapV2Pair  (permanently lock the first MINIMUM_LIQUIDITY tokens)
	});
  
  async function addLiquidity(addy: SignerWithAddress, token0Amount: BigNumberish, token1Amount: BigNumberish) {
    return await router.connect(addy).addLiquidity(token0.address, token1.address, token0Amount, token1Amount, token0Amount, token1Amount, addy.address, 1999999999);
  }

  async function swap(addy: SignerWithAddress, tokenAmount: BigNumberish, tokenFrom: ERC20, tokenTo: ERC20) {
    return await router.connect(addy).swapExactTokensForTokens(tokenAmount, 0, [tokenFrom.address, tokenTo.address], addy.address, 1999999999);
  }

  async function removeLiquidity(addy: SignerWithAddress, pair: Contract) {
    //console.log(pair)
    let balance = await pair.balanceOf(addy.address);
    //console.log(balance)
    await pair.connect(addy).approve(router.address, parseEther("999999999"));
    return await router.connect(addy).removeLiquidity(token0.address, token1.address, balance, 0, 0, addy.address, 1999999999);
  }

  async function getTotalSupply(token1Name: ERC20, token2Name: ERC20): Promise<[BigNumber, BigNumber]> {
    const token1Supply = await token1Name.totalSupply()
    const token2Supply = await token2Name.totalSupply()
    return [token1Supply, token2Supply]
  }

  async function getReserveRatio(pair: Contract): Promise<BigNumber> {
    const reserves = await pair.getReserves()
    //console.log(reserves._reserve0, reserves._reserve1)
    return (reserves._reserve0).div(reserves._reserve1) //Reserve ratio is the ratio of the reserves
  }

  async function getRedeemRatio(pair: Contract) {
    const reserves = await pair.getReserves()
    const supply = await pair.totalSupply()
    //console.log(reserves)
    //console.log(reserves._reserve0.div(supply).div(reserves._reserve1.div(supply)))
    return reserves._reserve0.div(supply).div(reserves._reserve1.div(supply))
  }

  async function getNetWorth(addy: any) {
    //address token balances
    const token0Bal = await token0.balanceOf(addy.address);
    const token1Bal = await token1.balanceOf(addy.address);
    const pairBal = await pair.balanceOf(addy.address)
   
    const reserveRatio = await getReserveRatio(pair)
    
    //Calculating Net Worth in terms of WETH i.e token1
    return (token0Bal.mul(reserveRatio)).add(token1Bal).add(pairBal.mul(reserveRatio))
  }

  async function GlobalNetWorthCheck() {
    let users = [owner, addr1, addr2, pair]
    let globalNetWorth = BigNumber.from(0)
    for(let user of users) {
      globalNetWorth=globalNetWorth.add(await getNetWorth(user))
    }
    //console.log(globalNetWorth)
    return globalNetWorth
  }

  it("Lemma 4.3: Preservation of token supply", async function () {
      // Ensures that transactions preserve the supply of atomic tokens. Minted tokens, instead, are preserved only by swap transactions, since deposit and redeem transactions, respectively, create and destroy minted tokens.

      let initSupply = await getTotalSupply(token0, token1)

      //Add initial liquidity
      await addLiquidity(addr1, parseEther("1000"), parseEther("1"));
      //console.log(await getTotalSupply(token0, token1))
      expect(await getTotalSupply(token0, token1)).to.deep.equal(initSupply)
      
      //addr2 makes swap
      initSupply = await getTotalSupply(token0, token1)
      await swap(addr2, parseEther("100"), token0, token1);
      expect(await getTotalSupply(token0, token1)).to.deep.equal(initSupply)

      //removing liq
      initSupply = await getTotalSupply(token0, token1)
      await removeLiquidity(addr1, pair);
      expect(await getTotalSupply(token0, token1)).to.deep.equal(initSupply)
  });

  // Lemmata 4.4 and 4.5 state that deposit and redeem transactions preserve the reserves ratio in AMMs and the redeem rate, respectively
  
  it("Lemma 4.4: Preservation of reserves ratio", async function () {
    
      //Add initial liquidity - Deposit
      await addLiquidity(addr1, parseEther("1000"), parseEther("1"));
      let initReserveRatio = await getReserveRatio(pair)
      
      //Add liquidity from another account - Deposit
      await addLiquidity(addr2, parseEther("1000"), parseEther("1"));
      expect(await getReserveRatio(pair)).to.equal(initReserveRatio)

      //Remove Liquidity - Redeem 
      initReserveRatio = await getReserveRatio(pair)
      await removeLiquidity(addr1, pair);
      expect(await getReserveRatio(pair)).to.equal(initReserveRatio)

      //Remove Liquidity - Redeem 
      initReserveRatio = await getReserveRatio(pair)
      await removeLiquidity(addr2, pair);
      expect(await getReserveRatio(pair)).to.equal(initReserveRatio)

      //If it passes, deposit and redeem transactions preserve the reserves ratio in the AMM
  });

  it("Lemma 4.5: Preservation of redeem ratio", async function () {
    
      //Add initial liquidity - Deposit
      await addLiquidity(addr1, parseEther("1000"), parseEther("1"));
      let initRedeemRatio = await getRedeemRatio(pair)

      //Add liquidity from another account - Deposit
      await addLiquidity(addr2, parseEther("1000"), parseEther("1"));
      expect(await getRedeemRatio(pair)).to.equal(initRedeemRatio)

      //Remove Liquidity - Redeem 
      initRedeemRatio = await getRedeemRatio(pair)
      await removeLiquidity(addr1, pair);
      expect(await getRedeemRatio(pair)).to.equal(initRedeemRatio)

      //Remove Liquidity - Redeem 
      initRedeemRatio = await getRedeemRatio(pair)
      await removeLiquidity(addr2, pair);
      expect(await getRedeemRatio(pair)).to.equal(initRedeemRatio)

      //If it passes, deposit and redeem transactions preserve the redeem ratio in the AMM
  });

  it("Lemma 4.6: Preservation of net worth", async function () {
      // Ensures that transactions (of any type) preserve the global net worth, whereas the net worth of individual users is preserved only by redeem and deposit transactions.
      
      let initGlobalNetWorth = await GlobalNetWorthCheck();
      await addLiquidity(addr1, parseEther("1000"), parseEther("1"));
      expect(await GlobalNetWorthCheck()).to.deep.equal(initGlobalNetWorth)
      //await getNetWorth(addr1)
      //swapping tokens
      initGlobalNetWorth = await GlobalNetWorthCheck();
      await swap(addr1, parseEther("1"), token0, token1);
      expect(await GlobalNetWorthCheck()).to.deep.equal(initGlobalNetWorth)
      //await getNetWorth(addr1)
      initGlobalNetWorth = await GlobalNetWorthCheck();
      await swap(addr2, parseEther("100"), token1, token0);
      expect(await GlobalNetWorthCheck()).to.deep.equal(initGlobalNetWorth)
      //await getNetWorth(addr1)
      initGlobalNetWorth = await GlobalNetWorthCheck();
      await removeLiquidity(addr1, pair);
      expect(await GlobalNetWorthCheck()).to.deep.equal(initGlobalNetWorth)
      
  });

});
