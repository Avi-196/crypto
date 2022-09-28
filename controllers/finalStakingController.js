var Web3 = require("web3");
const bip39 = require("bip39");
const { hdkey } = require("ethereumjs-wallet");

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://matic-mumbai.chainstacklabs.com")
);

const {
  finalStakingContractABI,
  finalStakingContract,
} = require("../config/FinalStaking");

const myContract = new web3.eth.Contract(
  finalStakingContractABI,
  finalStakingContract
);
const mnemonic =
  "uncover slide spray lab gospel echo brush enable stairs quick truck verify";

// const publicKey = "0x4F51E8b03CF03de9de407650a2B29c35311dA1C3";
// const privateKey = "9a4d1c029b8a9fd6f53f333415ae17b3289125d2c37a962e2e6fa04e5ab62db2";
// const contractAddress = "0xa6B506c444F9baceCcAF43E3ba28D226847D3691";

module.exports = {
  depositeToken: async (req, res) => {
    try {
      if (
        !req.body.senderAddress ||
        !req.body.privateKey ||
        !req.body.amountToDeposite
      ) {
        return res.status(404).json({ Message: `Invalid payment details.` });
      }
      console.log("req.body==>>", req.body);
      let { senderAddress, privateKey, amountToDeposite } = req.body;
      //   const balance = web3.utils.toWei(amountToDeposite.toString());

      const Data = await myContract.methods
        .depositeTokens(amountToDeposite.toString())
        .encodeABI();

      const rawTransaction = {
        from: senderAddress,
        to: finalStakingContract,
        gasPrice: web3.utils.toHex("30000000000"), // Always in Wei (30 gwei)
        gasLimit: web3.utils.toHex("200000"), // Always in Wei
        data: Data, // Setting the pid 12 with 0 alloc and 0 deposit fee
      };

      console.log("rawTransaction==>>", rawTransaction);
      console.log("privateKey====>>", privateKey);
      const signPromise = await web3.eth.accounts.signTransaction(
        rawTransaction,
        privateKey.toString()
      );
      console.log("signPromise====>", signPromise);

      web3.eth
        .sendSignedTransaction(signPromise.rawTransaction)
        .then((data) => {
          console.log({
            responseCode: 200,
            Status: "Success",
            Hash: signPromise.transactionHash,
          });
          return res
            .status(200)
            .json({
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

          res
            .status(501)
            .send({
              responseCode: 501,
              responseMessage: "Something went wrong!",
              error: error,
            });
        });
    } catch (error) {}
  },

  withdrawTokens: async (req, res) => {
    try {
      if (
        !req.body.senderAddress ||
        !req.body.privateKey ||
        !req.body.amountToDeposite
      ) {
        return res.status(404).json({ Message: `Invalid payment details.` });
      }
      console.log("req.body==>>", req.body);
      let { senderAddress, privateKey, amountToDeposite } = req.body;
      //   const balance = web3.utils.toWei(amountToDeposite.toString());

      const Data = await myContract.methods
        .withdrawTokens(amountToDeposite.toString())
        .encodeABI();

      const rawTransaction = {
        from: senderAddress,
        to: finalStakingContract,
        gasPrice: web3.utils.toHex("30000000000"), // Always in Wei (30 gwei)
        gasLimit: web3.utils.toHex("200000"), // Always in Wei
        data: Data, // Setting the pid 12 with 0 alloc and 0 deposit fee
      };

      console.log("rawTransaction==>>", rawTransaction);
      console.log("privateKey====>>", privateKey);
      const signPromise = await web3.eth.accounts.signTransaction(
        rawTransaction,
        privateKey.toString()
      );
      console.log("signPromise====>", signPromise);

      web3.eth
        .sendSignedTransaction(signPromise.rawTransaction)
        .then((data) => {
          console.log({
            responseCode: 200,
            Status: "Success",
            Hash: signPromise.transactionHash,
          });
          return res
            .status(200)
            .json({
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

          res
            .status(501)
            .send({
              responseCode: 501,
              responseMessage: "Something went wrong!",
              error: error,
            });
        });
    } catch (error) {}
  },

  getStakingBalance: async (req, res) => {
    try {
      if (!req.query.address) {
        return res.status(404).json({ Message: `Invalid payment details.` });
      }
      var userBalance = await myContract.methods
        .stakingBalance(req.query.address)
        .call();
      // const decimals = await myContract.methods.decimals().call()

      userBalance = web3.utils.fromWei(userBalance);
      return res
        .status(200)
        .send({
          responseCode: 200,
          responseMessage: "Balance fetched successfully.",
          responseResult: { balance: Number(userBalance) },
        });
    } catch (error) {
      return res
        .status(501)
        .send({
          responseCode: 501,
          responseMessage: "Something went wrong!",
          error: error.message,
        });
    }
  },
};
