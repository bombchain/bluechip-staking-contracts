module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const { phubzap } = await deploy("FeeWizard", {
    from: deployer,
    proxy: true,
    args: [dev, "0x970a6ed897D8C62797368d5BE55520c058639105", "0x970a6ed897D8C62797368d5BE55520c058639105"],
    log: true,
    deterministicDeployment: false,
  });
};

module.exports.tags = ["Phubzap"];
