import { GemsToken, events as tokenEvents } from 'gems-token';
import Watcher from '@xlnt/scry-one';

import settings from '../common/settings';
import { promisify } from '../common/utils';

export class GemsService {
  initWeb3 = () => {
    if (window.web3 === undefined) {
      throw new Error('MetaMask not loaded');
    }
    this.web3 = new Web3(window.web3.currentProvider);
  }

  initGemTokens = async () => {
    const watcher = new Watcher(
      process.env.ETH_NODE,
      tokenEvents,
    );

    const instance = new GemsToken(
      this.web3.currentProvider,
      this.getDefaultAccount(),
      watcher,
    );
    await instance.init();
    this.gems = instance;
  }

  approve = async (value) => {
    if (!this.gems) {
      throw new Error('Gems instance is not initialized');
    }
    await this.gems.approve(settings.vaultAddress, value * 1e+18);
  }

  getDefaultAccount = () =>
    this.web3.eth.accounts[0];

  verifyAccount = async (accountId) => {
    const accounts = await this.getAccounts();
    if (`0x${accountId}` !== accounts[0]) {
      throw new Error('Invalid account');
    }
  }

  getAccountSingature = async (address) => {
    const message = [{ type: 'address', name: 'address', value: address }];
    return this.signTypedData(address, [message, address]);
  }

  signTypedData = async (address, params) => {
    const data = { method: 'eth_signTypedData', from: address, params };
    return this.sendAsync(data);
  }

  getAccounts = async () => {
    const call = promisify(this.web3.eth.getAccounts, this.web3.eth);
    return call();
  }

  sendAsync = async (data) => {
    const call = promisify(this.web3.currentProvider.sendAsync, this.web3.currentProvider);
    return call(data);
  }
}

export const gemsService = new GemsService();
