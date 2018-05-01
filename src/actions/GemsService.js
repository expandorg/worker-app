import settings from '../common/settings';

export class Repository {
  web3 = null
  gems = null

  setWeb3 = (web3) => {
    this.web3 = web3;
  }

  setGems = (gems) => {
    this.gems = gems;
  }
}

export class GemsService {
  constructor(repository) {
    this.repository = repository;
  }

  approve = async (value) => {
    await this.repository.gems.approve(settings.vaultAddress, value * 1e+18);
  }
}

export const repository = new Repository();

export const gemsService = new GemsService(repository);
