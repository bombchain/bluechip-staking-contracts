module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments;

  const { deployer, dev, admin } = await getNamedAccounts();

  const { stakeVault } = await deploy("StakeVault", {
    from: deployer,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "initialize",
          args: [dev],
        },
      },
    },
    log: true,
    deterministicDeployment: false,
  });
};

module.exports.tags = ["Vault"];
