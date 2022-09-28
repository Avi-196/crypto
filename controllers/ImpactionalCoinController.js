var Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://eth-goerli.g.alchemy.com/v2/OvSA96VwlH3Cw9kEK3Mg6hhW1E4jNMxu"
  )
);

const { contractABI, contract } = require("../config/ImpactionalCoin");

const Contract = new web3.eth.Contract(contractABI, contract);

module.exports = {
  name: async (req, res) => {
    try {
      const erc20Name = await Contract.methods.name().call();
      return res.status(200).send({
        responseCode: 200,
        responseMessage: "Name fetched successfully.",
        responseResult: { name: erc20Name },
      });
    } catch (error) {
      return res.status(501).send({
        responseCode: 501,
        responseMessage: "Something went wrong!",
        error: error.message,
      });
    }
  },
  symbol: async (req, res) => {
    try {
      const erc20symbol = await Contract.methods.symbol().call();
      return res.status(200).send({
        responseCode: 200,
        responseMessage: "Symbol fetched successfully.",
        responseResult: { symbol: erc20symbol },
      });
    } catch (error) {
      return res.status(501).send({
        responseCode: 501,
        responseMessage: "Something went wrong!",
        error: error.message,
      });
    }
  },
  decimals: async (req, res) => {
    try {
      const erc20decimals = await Contract.methods.decimals().call();
      return res.status(200).send({
        responseCode: 200,
        responseMessage: "Symbol fetched successfully.",
        responseResult: { decimals: erc20decimals },
      });
    } catch (error) {
      return res.status(501).send({
        responseCode: 501,
        responseMessage: "Something went wrong!",
        error: error.message,
      });
    }
  },

  totalSupply: async (req, res) => {
    try {
      const erc20totalSupply = await Contract.methods.totalSupply().call();
      return res.status(200).send({
        responseCode: 200,
        responseMessage: "Symbol fetched successfully.",
        responseResult: { totalSupply: erc20totalSupply },
      });
    } catch (error) {
      return res.status(501).send({
        responseCode: 501,
        responseMessage: "Something went wrong!",
        error: error.message,
      });
    }
  },

  balanceOf: async (req, res) => {
    try {
      if (!req.query.address) {
        res.status(404).send({
          responseCode: 404,
          responseMessage: "Invalid address",
          responseResult: {
            notFound: "address not Found ",
          },
        });
      }
      const balance = await Contract.methods
        .balanceOf(req.query.address)
        .call();
      return res.status(200).send({
        responseCode: 200,
        responseMessage: "Balance fetched successfully.",
        responseResult: { balance: balance },
      });
    } catch (error) {
      return res.status(501).send({
        responseCode: 501,
        responseMessage: "Something went wrong!",
        error: error.message,
      });
    }
  },

  transfer: async (req, res) => {
    try {
      const privateKey = req.query.privateKey;
      const amount = req.query.amount;
      const to = req.query.to;

      if (!privateKey || !amount || !to) {
        res.status(404).send({
          responseCode: 404,
          responseMessage: "Invalid payment details",
          responseResult: {
            notFound: " Invalid payment details ",
          },
        });
      }

      const Data = await Contract.methods.transfer(to, amount).encodeABI();

      const rawTransaction = {
        to: contract,
        gasPrice: web3.utils.toHex("30000000000"), // Always in Wei (30 gwei)
        gasLimit: web3.utils.toHex("200000"), // Always in Wei
        data: Data, // Setting the pid 12 with 0 alloc and 0 deposit fee
      };

      const signPromise = await web3.eth.accounts.signTransaction(
        rawTransaction,
        privateKey.toString()
      );

      web3.eth
        .sendSignedTransaction(signPromise.rawTransaction)
        .then((data) => {
          console.log({
            responseCode: 200,
            Status: "Success",
            Hash: signPromise.transactionHash,
          });
          return res.status(200).json({
            responseCode: 200,
            responseMessage: "Success",
            responseResult: data,
          });
        })
        .catch((error) => {
          console.log({
            responseCode: 501,
            responseMessage: "Something went wrong!",
            error: error,
          });

          res.status(501).send({
            responseCode: 501,
            responseMessage: "Something went wrong!",
            error: error,
          });
        });
    } catch (error) {
      return res.status(501).send({
        responseCode: 501,
        responseMessage: "Something went wrong!",
        error: error.message,
      });
    }
  },

  allowance: async (req, res) => {
    try {
      if (!req.query.owner || !req.query.spender) {
        res.status(404).send({
          responseCode: 404,
          responseMessage: "Invalid address",
          responseResult: {
            notFound: "address not Found ",
          },
        });
      }
      const allowance = await Contract.methods
        .allowance(req.query.owner, req.query.spender)
        .call();
      return res.status(200).send({
        responseCode: 200,
        responseMessage: "Allowance fetched successfully.",
        responseResult: { allowance: allowance },
      });
    } catch (error) {
      return res.status(501).send({
        responseCode: 501,
        responseMessage: "Something went wrong!",
        error: error.message,
      });
    }
  },

  approve: async (req, res) => {
    try {
      const privateKey = req.query.privateKey;
      const amount = req.query.amount;
      const spender = req.query.spender;

      if (!amount || !privateKey || !spender) {
        res.status(404).send({
          responseCode: 404,
          responseMessage: "Invalid payment details",
          responseResult: {
            notFound: " Invalid payment details ",
          },
        });
      }

      const Data = await Contract.methods.approve(spender, amount).encodeABI();

      const rawTransaction = {
        to: contract,
        gasPrice: web3.utils.toHex("30000000000"), // Always in Wei (30 gwei)
        gasLimit: web3.utils.toHex("200000"), // Always in Wei
        data: Data, // Setting the pid 12 with 0 alloc and 0 deposit fee
      };

      const signPromise = await web3.eth.accounts.signTransaction(
        rawTransaction,
        privateKey.toString()
      );

      web3.eth
        .sendSignedTransaction(signPromise.rawTransaction)
        .then((data) => {
          console.log({
            responseCode: 200,
            Status: "Success",
            Hash: signPromise.transactionHash,
          });
          return res.status(200).json({
            responseCode: 200,
            responseMessage: "Success",
            responseResult: data,
          });
        })
        .catch((error) => {
          console.log({
            responseCode: 501,
            responseMessage: "Something went wrong!",
            error: error,
          });

          res.status(501).send({
            responseCode: 501,
            responseMessage: "Something went wrong!",
            error: error,
          });
        });
    } catch (error) {
      return res.status(501).send({
        responseCode: 501,
        responseMessage: "Something went wrong!",
        error: error.message,
      });
    }
  },

  transferFrom: async (req, res) => {
    try {
      const privateKey = req.query.privateKey;
      const amount = req.query.amount;
      const from = req.query.from;
      const to = req.query.to;
      if (!amount || !from || !to || !privateKey) {
        res.status(404).send({
          responseCode: 404,
          responseMessage: "Invalid payment details",
          responseResult: {
            notFound: " Invalid payment details ",
          },
        });
      }

      const Data = await Contract.methods
        .transferFrom(from, to, amount)
        .encodeABI();

      const rawTransaction = {
        to: contract,
        gasPrice: web3.utils.toHex("30000000000"), // Always in Wei (30 gwei)
        gasLimit: web3.utils.toHex("200000"), // Always in Wei
        data: Data, // Setting the pid 12 with 0 alloc and 0 deposit fee
      };

      const signPromise = await web3.eth.accounts.signTransaction(
        rawTransaction,
        privateKey.toString()
      );

      web3.eth
        .sendSignedTransaction(signPromise.rawTransaction)
        .then((data) => {
          console.log({
            responseCode: 200,
            Status: "Success",
            Hash: signPromise.transactionHash,
          });
          return res.status(200).json({
            responseCode: 200,
            responseMessage: "Success",
            responseResult: data,
          });
        })
        .catch((error) => {
          console.log({
            responseCode: 501,
            responseMessage: "Something went wrong!",
            error: error,
          });

          res.status(501).send({
            responseCode: 501,
            responseMessage: "Something went wrong!",
            error: error,
          });
        });
    } catch (error) {
      return res.status(501).send({
        responseCode: 501,
        responseMessage: "Something went wrong!",
        error: error.message,
      });
    }
  },

  contractBalance: async (req, res) => {
    try {
      const contractBalance = await Contract.methods.contractBalance().call();
      return res.status(200).send({
        responseCode: 200,
        responseMessage: "contract Balance fetched successfully.",
        responseResult: { ContractBalance: contractBalance },
      });
    } catch (error) {
      return res.status(501).send({
        responseCode: 501,
        responseMessage: "Something went wrong!",
        error: error.message,
      });
    }
  },

  redeem: async (req, res) => {
    try {
      const privateKey = req.query.privateKey;
      if (!privateKey) {
        res.status(404).send({
          responseCode: 404,
          responseMessage: "Invalid payment details",
          responseResult: {
            notFound: " Invalid payment details ",
          },
        });
      }

      const Data = await Contract.methods.redeem().encodeABI();

      const rawTransaction = {
        to: contract,
        gasPrice: web3.utils.toHex("30000000000"), // Always in Wei (30 gwei)
        gasLimit: web3.utils.toHex("200000"), // Always in Wei
        data: Data, // Setting the pid 12 with 0 alloc and 0 deposit fee
      };

      const signPromise = await web3.eth.accounts.signTransaction(
        rawTransaction,
        privateKey.toString()
      );

      web3.eth
        .sendSignedTransaction(signPromise.rawTransaction)
        .then((data) => {
          console.log({
            responseCode: 200,
            Status: "Success",
            Hash: signPromise.transactionHash,
          });
          return res.status(200).json({
            responseCode: 200,
            responseMessage: "Success",
            responseResult: data,
          });
        })
        .catch((error) => {
          console.log({
            responseCode: 501,
            responseMessage: "Something went wrong!",
            error: error,
          });

          res.status(501).send({
            responseCode: 501,
            responseMessage: "Something went wrong!",
            error: error,
          });
        });
    } catch (error) {
      return res.status(501).send({
        responseCode: 501,
        responseMessage: "Something went wrong!",
        error: error.message,
      });
    }
  },

  buyToken: async (req, res) => {
    try {
      const privateKey = req.query.privateKey;
      const amount = req.query.amount;
      if (!privateKey || !amount) {
        return res.status(404).json({ Message: `Invalid payment details.` });
      }

      const weiValue = Web3.utils.toWei(amount, "wei");
      console.log(weiValue);

      const Data = await Contract.methods.buyToken().encodeABI();

      const rawTransaction = {
        to: contract,
        value: `${weiValue}`,
        gasPrice: web3.utils.toHex("30000000000"), // Always in Wei (30 gwei)
        gasLimit: web3.utils.toHex("200000"), // Always in Wei
        data: Data, // Setting the pid 12 with 0 alloc and 0 deposit fee
      };

      const signPromise = await web3.eth.accounts.signTransaction(
        rawTransaction,
        privateKey.toString()
      );

      web3.eth
        .sendSignedTransaction(signPromise.rawTransaction)
        .then((data) => {
          console.log({
            responseCode: 200,
            Status: "Success",
            Hash: signPromise.transactionHash,
          });
          return res.status(200).json({
            responseCode: 200,
            responseMessage: "Success",
            responseResult: data,
          });
        })
        .catch((error) => {
          console.log({
            responseCode: 501,
            responseMessage: "Something went wrong!",
            error: error.message,
          });

          res.status(501).send({
            responseCode: 501,
            responseMessage: "Something went wrong!",
            error: error.message,
          });
        });
    } catch (error) {
      return res.status(501).send({
        responseCode: 501,
        responseMessage: "Something went wrong!",
        error: error.message,
      });
    }
  },
};
