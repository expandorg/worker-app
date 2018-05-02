import GemsToken from 'gems-token';

import settings from '../common/settings';
import { promisify } from '../common/utils';

export class GemsService {
  initWeb3() {
    if (window.web3 === undefined) {
      throw new Error('MetaMask not loaded');
    }
    this.web3 = new Web3(window.web3.currentProvider);
  }

  initGemTokens = async () => {
    const address = this.getDefaultAccount();
    const instance = new GemsToken(this.web3.currentProvider, address);
    await instance.init();
    this.gems = instance;
  }

  approve = async (value) => {
    await this.gems.approve(settings.vaultAddress, value * 1e+18);
  }

  getDefaultAccount = () =>
    this.web3.eth.accounts[0];

  getAccountSingature = async (address) => {
    const message = [{ type: 'address', name: 'address', value: address }];
    return this.signTypedData(address, [message, address]);
  }

  signTypedData = async (address, params) => {
    const data = { method: 'eth_signTypedData', from: address, params };
    return this.sendAsync(data);
  }

  getAccounts = () => {
    const call = promisify(this.web3.eth.getAccounts, this.web3.eth);
    return call();
  }

  sendAsync = async (data) => {
    const call = promisify(this.web3.currentProvider.sendAsync, this.web3.currentProvider);
    return call(data);
  }
}

export const gemsService = new GemsService();
