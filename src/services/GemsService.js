// @flow
import { GemsToken, events as tokenEvents } from 'gems-token';
import Watcher from '@xlnt/scry-one';

import { promisify } from '../common/utils';

const GAS_PRICE_FACTOR = 1e8;

const GAS_PRICE_MIN = 7e9;
const GAS_PRICE_MAX = 80e9;

export default class GemsService {
  vaultAddress: string;
  web3: window.Web3;
  gems: GemsToken;

  constructor(vaultAddress: string) {
    this.vaultAddress = vaultAddress;
  }

  initWeb3 = () => {
    if (window.web3 === undefined) {
      throw new Error('MetaMask not loaded');
    }
    this.web3 = new window.Web3(window.web3.currentProvider);
  };

  initGemTokens = async () => {
    const watcher = new Watcher(process.env.ETH_NODE, tokenEvents);

    const instance = new GemsToken(
      this.web3.currentProvider,
      this.getDefaultAccount(),
      watcher
    );
    await instance.init();
    this.gems = instance;
  };

  calculateGasPrice = (average: number) =>
    Math.min(
      Math.max(average * GAS_PRICE_FACTOR, GAS_PRICE_MIN),
      GAS_PRICE_MAX
    );

  approve = async (value: number, average: number) => {
    if (!this.gems) {
      throw new Error('Gems instance is not initialized');
    }
    const gasPrice = this.calculateGasPrice(average);
    await this.gems.approve(this.vaultAddress, value * 1e18, { gasPrice });
  };

  getDefaultAccount = () => this.web3.eth.accounts[0];

  verifyAccount = async (accountId: string) => {
    const accounts = await this.getAccounts();
    if (`0x${accountId}` !== accounts[0]) {
      throw new Error('Invalid account');
    }
  };

  getAccountSingature = async (address: string) => {
    const message = [{ type: 'address', name: 'address', value: address }];
    return this.signTypedData(address, [message, address]);
  };

  signTypedData = async (address: string, params: any) => {
    const data = { method: 'eth_signTypedData', from: address, params };
    return this.sendAsync(data);
  };

  getAccounts = async () => {
    const call = promisify(this.web3.eth.getAccounts, this.web3.eth);
    return call();
  };

  sendAsync = async (data: any) => {
    const call = promisify(
      this.web3.currentProvider.sendAsync,
      this.web3.currentProvider
    );
    return call(data);
  };
}
