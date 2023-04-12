import "dotenv/config";
import "hardhat-deploy";
import "hardhat-abi-exporter";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const accounts = {
  mnemonic:
    process.env.MNEMONIC ||
    "test test test test test test test test test test test junk",
  // accountsBalance: "990000000000000000000",
};

const config: HardhatUserConfig = {
  abiExporter: {
    path: "./abi",
    clear: false,
    flat: true,
    // only: [],
    // except: []
  },
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,

    customChains: [
      {
        network: "bomb",
        chainId: 2300,
        urls: {
          apiURL: "https://bombscan.com/",
          browserURL: "https://bombscan.com/",
        },
      },
      {
        network: "bas",
        chainId: 232323,
        urls: {
          apiURL: "https://blockscout.bas.pegchain.io/",
          browserURL: "https://blockscout.bas.pegchain.io/",
        },
      },
    ],
  },
  mocha: {
    timeout: 20000,
  },
  namedAccounts: {
    deployer: {
      default: 3,
      "bsc-testnet": 0,
      bsc: 0,
    },
    dev: {
      // Default to 1
      default: "0x0D8e060CA2D847553ec14394ee6B304623E0d1d6",
      // dev address mainnet
      // 1: "",
    },
    admin: {
      // Default to 1
      default: "0x49707808908f0C2450B3F2672E012eDBf49eD808",
      // dev address mainnet
      // 1: "",
    },
  },
  networks: {
    "bomb-testnet": {
      url: "https://bombchain-testnet.ankr.com/bas_full_rpc_1",
      accounts,
      chainId: 2399,
      live: true,
      saveDeployments: true,
      gasPrice: 10 * 1000000000,
    },
    bomb: {
      //  url: "https://bombchain-mainnet.ankr.com/bomb_mainnet_full_rpc_1",
      url: "https://rpc.bombchain.com",
      accounts,
      chainId: 2300,
      live: true,
      saveDeployments: true,
      gasPrice: 10 * 1000000000,
    },
    bas: {
      url: "https://rpc.bas.pegchain.io",
      accounts,
      chainId: 232323,
      live: true,
      saveDeployments: true,
      gasPrice: 10 * 1000000000,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      gasPrice: 120 * 1000000000,
      chainId: 1,
    },
    localhost: {
      accounts,
      live: false,
      saveDeployments: true,
      tags: ["local"],
    },
    hardhat: {
      forking: {
        enabled: process.env.FORKING === "true",
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      },
      accounts,
      live: false,
      saveDeployments: true,
      tags: ["test", "local"],
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 3,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 5000000000,
      gasMultiplier: 2,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 4,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 5000000000,
      gasMultiplier: 2,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 5,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 5000000000,
      gasMultiplier: 2,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 42,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 20000000000,
      gasMultiplier: 2,
    },
    moonbase: {
      url: "https://rpc.testnet.moonbeam.network",
      accounts,
      chainId: 1287,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gas: 5198000,
      gasMultiplier: 2,
    },
    fantom: {
      url: "https://rpc.ftm.tools",
      accounts,
      chainId: 250,
      live: true,
      saveDeployments: true,
    },
    "fantom-testnet": {
      url: "https://rpc.testnet.fantom.network",
      accounts,
      chainId: 4002,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    matic: {
      url: "https://rpc-mainnet.maticvigil.com",
      accounts,
      chainId: 137,
      live: true,
      saveDeployments: true,
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts,
      chainId: 80001,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    xdai: {
      url: "https://rpc.xdaichain.com",
      accounts,
      chainId: 100,
      live: true,
      saveDeployments: true,
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org",
      accounts,
      chainId: 56,
      live: true,
      saveDeployments: true,
    },
    "bsc-testnet": {
      url: "https://data-seed-prebsc-2-s3.binance.org:8545",
      accounts,
      chainId: 97,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    heco: {
      url: "https://http-mainnet.hecochain.com",
      accounts,
      chainId: 128,
      live: true,
      saveDeployments: true,
    },
    "heco-testnet": {
      url: "https://http-testnet.hecochain.com",
      accounts,
      chainId: 256,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      accounts,
      chainId: 43114,
      live: true,
      saveDeployments: true,
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts,
      chainId: 43113,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    harmony: {
      url: "https://api.s0.t.hmny.io",
      accounts,
      chainId: 1666600000,
      live: true,
      saveDeployments: true,
    },
    "harmony-testnet": {
      url: "https://api.s0.b.hmny.io",
      accounts,
      chainId: 1666700000,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    okex: {
      url: "https://exchainrpc.okex.org",
      accounts,
      chainId: 66,
      live: true,
      saveDeployments: true,
    },
    "okex-testnet": {
      url: "https://exchaintestrpc.okex.org",
      accounts,
      chainId: 65,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    arbitrum: {
      url: "https://arb1.arbitrum.io/rpc",
      accounts,
      chainId: 42161,
      live: true,
      saveDeployments: true,
      blockGasLimit: 700000,
    },
    "arbitrum-testnet": {
      url: "https://kovan3.arbitrum.io/rpc",
      accounts,
      chainId: 79377087078960,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    celo: {
      url: "https://forno.celo.org",
      accounts,
      chainId: 42220,
      live: true,
      saveDeployments: true,
    },
    palm: {
      url: "https://palm-mainnet.infura.io/v3/da5fbfafcca14b109e2665290681e267",
      accounts,
      chainId: 11297108109,
      live: true,
      saveDeployments: true,
    },
    "palm-testnet": {
      url: "https://palm-testnet.infura.io/v3/da5fbfafcca14b109e2665290681e267",
      accounts,
      chainId: 11297108099,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
    },
    moonriver: {
      url: "https://rpc.moonriver.moonbeam.network",
      accounts,
      chainId: 1285,
      live: true,
      saveDeployments: true,
    },
    fuse: {
      url: "https://rpc.fuse.io",
      accounts,
      chainId: 122,
      live: true,
      saveDeployments: true,
    },
    clover: {
      url: "https://rpc-ivy.clover.finance",
      accounts,
      chainId: 1024,
      live: true,
      saveDeployments: true,
    },
  },
  paths: {
    artifacts: "artifacts",
    cache: "cache",
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
    sources: "contracts",
    tests: "test",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
};

export default config;
