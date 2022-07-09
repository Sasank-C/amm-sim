import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Wallet, BigNumber, BigNumberish } from 'ethers';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { UniswapV2Factory, UniswapV2Pair, UniswapV2Router02  } from "../typechain-types";
import { ERC20 } from "../typechain-types/contracts/test";
import { ERC20__factory } from "../typechain-types/factories/contracts/test";
import { Address } from "cluster";



describe("Part 1", function () {

  //let tokenFactory;
  let token0: ERC20;
  let token1: ERC20;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];
  let router: Contract;
  let pairAddress

  beforeEach(async function () {

		[owner, addr1, addr2, ...addrs] = await ethers.getSigners();

		const tokenFactory = (await ethers.getContractFactory("contracts/test/ERC20.sol:ERC20", owner)) as ERC20__factory;
    const totalSupply = (10 ** 9).toString();
    token0 = await tokenFactory.deploy(ethers.utils.parseEther(totalSupply));
    token1 = await tokenFactory.deploy(ethers.utils.parseEther(totalSupply));
    console.log(token0.address);
    console.log(token1.address);
    const pairFactory = await (await ethers.getContractFactory("UniswapV2Factory", owner)).deploy(owner.address);
    console.log(pairFactory.address);
    router = await (await ethers.getContractFactory("UniswapV2Router02", owner)).deploy(pairFactory.address, token1.address);
    await router.deployed();
    console.log(router.address);
    await pairFactory.createPair(token0.address, token1.address);
    const pairAddress = await pairFactory.getPair(token0.address, token1.address);
    console.log(pairAddress)
    const pair = await ethers.getContractAt("UniswapV2Pair", pairAddress, owner);
    console.log(pair.address)

    //Transfer tokens to addresses
    await token0.transfer(addr1.address, 100);
    await token0.transfer(addr2.address, 100);

    await token1.transfer(addr1.address, 100);
    await token1.transfer(addr2.address, 100);
    await token0.connect(addr1).approve(router.address, 99999999999999);
    await token1.connect(addr1).approve(router.address, 99999999999999);
    await token0.connect(addr2).approve(router.address, 99999999999999);
    await token1.connect(addr2).approve(router.address, 99999999999999);
	});
  
  async function addLiquidity(addy: SignerWithAddress, token0Amount: BigNumberish, token1Amount: BigNumberish) {
    return await router.connect(addy).addLiquidity(token0.address, token1.address, token0Amount, token1Amount, token0Amount, token1Amount, addy.address, 9999999999);
  }

  async function getTotalSupply(token1Name: ERC20, token2Name: ERC20): Promise<[BigNumber, BigNumber]> {
    const token1Supply = await token1Name.totalSupply()
    const token2Supply = await token2Name.totalSupply()
    return [token1Supply, token2Supply]
  }

  it("Lemma 4.3: Preservation of token supply", async function () {


      const initSupply = await getTotalSupply(token0, token1)
      console.log(initSupply)
      //Add initial liquidity
      //await router.connect(addr1).addLiquidity(token0.address, token1.address, 100, 100, 100, 100, addr1.address, 1999999999);
      await addLiquidity(addr1, 100, 100);
      console.log("works")
      expect(await getTotalSupply(token0, token1)).to.equal(initSupply)

      //addr2 makes swap
      // await router.connect(addr2).swapExactTokensForTokens(
  });
});
