// eslint-disable-next-line import/no-unresolved
const runScript = require('gems-token/src/runScript');

const topup = async token => {
  const deposit = (+process.argv[3] || 10) * 1e18;
  const results = await token.transfer(process.argv[2], deposit);
  console.log(results);
};

(async () => {
  try {
    await runScript(topup);
    console.log('done');
  } catch (err) {
    console.error(err);
  }
})();
