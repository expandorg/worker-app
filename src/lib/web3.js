let web3Client;

export const initWeb3 = () => {
  if (typeof window.web3 !== 'undefined') {
    web3Client = new window.Web3(window.web3.currentProvider);
  }

  return Boolean(web3Client);
};

export const watchForMetaMaskUnlock = () => new Promise((resolve) => {
  if (web3Client.eth.accounts.length !== 0) {
    resolve();

    return;
  }

  const interval = setInterval(() => {
    if (web3Client.eth.accounts.length > 0) {
      clearInterval(interval);

      resolve();
    }
  }, 300);
});

export default () => web3Client;
