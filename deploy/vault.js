module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const { stakeVault } = await deploy("StakeVault", {
    from: deployer,
    args: [dev],
    log: true,
    deterministicDeployment: false,
  });
};
module.exports.tags = ["Vault"];
