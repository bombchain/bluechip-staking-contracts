module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments;

  const { deployer, dev, admin } = await getNamedAccounts();

  const { stakeVault } = await deploy("StakingPosition", {
    from: deployer,

    args: ["0x230319f254A72F38f3BF4D37A20cA2D236287817"],

    log: true,
    deterministicDeployment: false,
  });
};

module.exports.tags = ["StakePosition"];
