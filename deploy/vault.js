module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const { phubzap } = await deploy("StakeVault", {
    from: deployer,
    // proxy: {
    //   execute: {
    //     init: {
    //       methodName: "initialize",
    //  args: [
    //    dev,
    //    "0x970a6ed897D8C62797368d5BE55520c058639105",
    //    "0x970a6ed897D8C62797368d5BE55520c058639105",
    //  ],
    //     },
    //   },
    // },
    //  args: [dev],
    log: true,
    deterministicDeployment: false,
  });
};
module.exports.tags = ["Vault"];
