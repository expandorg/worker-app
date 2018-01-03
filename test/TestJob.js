const Job = artifacts.require('Job');

function getLog(result, i) {
  return result.logs[i].args;
}

function weiToEth(n) {
  return web3.fromWei(n, 'ether');
}

function ethToWei(n) {
  return web3.toWei(n, 'ether');
}

function etherDiff(before, after) {
  const diff = before.minus(after).toNumber();
  return weiToEth(diff);
}

contract('Job', (accounts) => {
  const requester = accounts[1];
  const worker = accounts[2];

  const ethValue = 10;
  const weiValue = ethToWei(ethValue);

  it('deposit', async () => {
    const job = await Job.deployed();

    const beforeBalance = await web3.eth.getBalance(requester);

    const depositResult = await job.depositValue({
      from: requester,
      value: weiValue,
    });
    assert.equal(depositResult.logs.length, 1);
    const log = getLog(depositResult, 0);
    assert.equal(log.value, weiValue);

    const afterBalance = await web3.eth.getBalance(requester);
    const diff = etherDiff(beforeBalance, afterBalance);
    assert.equal(Math.floor(diff), ethValue);
  });

  // // Omit test unitl https://github.com/trufflesuite/truffle/issues/561 is resolved
  // it('withdraw', async () => {
  //   const job = await Job.deployed();
  //
  //   const beforeBalance = await web3.eth.getBalance(worker);
  //
  //   const payoutResult = await job.payoutValue(worker, weiValue);
  //   assert.equal(payoutResult.logs.length, 1);
  //   const log = getLog(payoutResult, 0);
  //   assert.equal(log.worker, worker);
  //   assert.equal(log.value, weiValue);
  //
  //   const afterBalance = await web3.eth.getBalance(worker);
  //   const diff = etherDiff(beforeBalance, afterBalance);
  //   assert.equal(-Math.floor(diff), ethValue);
  // });
});
