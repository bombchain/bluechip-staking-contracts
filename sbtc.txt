module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const vault = await deployments.get("StakeVault");

  const { phubzap } = await deploy("sBTC", {
    from: deployer,
    args: [
      "0x8BaBbB98678facC7342735486C851ABD7A0d17Ca",
      vault.address,
      "https://api.bomb.app/metadata/",
    ],
    log: true,
    deterministicDeployment: false,
  });
};

module.exports.tags = ["btc"];
module.exports.dependencies = ["Vault"];
