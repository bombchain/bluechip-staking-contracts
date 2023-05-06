module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments;

  const { deployer, dev, admin } = await getNamedAccounts();

  const vault = "0x05bB64486d64a7455c3c6Df3DfC1426ed598D28f";

  const { stakeVault } = await deploy("StakingPosition", {
    from: deployer,

    args: [vault],

    log: true,
    deterministicDeployment: false,
  });
};

module.exports.tags = ["StakePosition"];
module.exports.dependencies = ["Vault"];
// module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
//   const { deploy } = deployments;

//   const { deployer, dev, admin } = await getNamedAccounts();

//   const { stakeVault } = await deploy("StakingPosition", {
//     from: deployer,
//     proxy: {
//       proxyContract: "OpenZeppelinTransparentProxy",
//       execute: {
//         init: {
//           methodName: "initialize",
//           args: [dev],
//         },
//       },
//     },
//     log: true,
//     deterministicDeployment: false,
//   });
// };

// module.exports.tags = ["Vault"];
