const axios = require('axios')
const bip39 = require('bip39')
const BNB_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
const Web3 = require("web3");
const EthereumTx = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common');
const { hdkey } = require('ethereumjs-wallet');
var web3 = new Web3(new Web3.providers.HttpProvider(BNB_URL));
const { contractABI, contract } = require("../config/bep20");
const myContract = new web3.eth.Contract(contractABI, contract)
const mnemonic = "uncover slide spray lab gospel echo brush enable stairs quick truck verify";

const AdminAddress = '0xc46c23549cB32cD9708c15eF6986207c55F6C3ED';
const AdminPrivateKey = '5c5cc5dce23b99d4831eba4471007ea41ec1a35a87cdb72e0b5629abc1ffd660';

const getCurrentGasPrices = async () => {
    let response = await axios.get('https://ethgasstation.info/api/ethgasAPI.json?api-key=ce8da4d2e680dad6465330e7869efe101517aad8274be133e44a8119d5c0');
    let prices = {
        low: response.data.safeLow / 10,
        medium: response.data.average / 10,
        high: response.data.fast / 10
    };
    return prices;
}

const EthHelper = async () => {
    let currentGasPrice = await getCurrentGasPrices();
    let gasPrice = currentGasPrice.high * 1000000000
    let gasLimit = 21000;
    let fee = gasLimit * gasPrice;
    let txFee = Number(web3.utils.fromWei(fee.toString(), "ether"));
    return { fee: txFee, gasPrice: gasPrice }
}

const accountBalance = async (senderAddress) => {
    const response = await axios.get(`https://api-testnet.bscscan.com/api?module=account&action=balance&address=${senderAddress}&apikey=GQWQPRVJXUI35NTS2VK4J8KEMZCRXJAI4S`)
    console.log(response.data.result);
    let balance = web3.utils.fromWei(response.data.result, "ether");
    return Number(balance)
}

const preTransfer = async (senderAddress, amountToSend) => {
    const { fee } = await EthHelper()
    let balance = await accountBalance(senderAddress)
    if (balance - amountToSend - fee < 0) {
        console.log('insufficient funds', balance);
        return { status: false, message: 'Low Balance', balance: balance }
    } else {
        return { status: true, message: 'Transfer Possible' }
    }
}

const transferAdminToUserForGasFee = async (adminAddress, adminPrivateKey, userAddress, amountToSend) => {
    try {
        var nonce = await web3.eth.getTransactionCount(adminAddress);
        const { gasPrice } = await EthHelper();
        const { status } = await preTransfer(adminAddress, amountToSend);
        if (status == false) {
            console.log({ status: status, message: "Low Balance" });
        }
        let txObject = {
            to: userAddress,
            value: web3.utils.toHex(
                web3.utils.toWei(amountToSend.toString(), "ether")
            ),
            gas: 21000,
            gasPrice: gasPrice,
            nonce: nonce,
        };
        const common = Common.default.forCustomChain(
            "mainnet",
            {
                name: "bnb",
                networkId: "0x61",
                chainId: "0x61",
            },
            "petersburg"
        );
        const transaction = new EthereumTx(txObject, { common: common });
        let privKey = Buffer.from(adminPrivateKey, "hex");
        transaction.sign(privKey);
        const serializedTransaction = transaction.serialize();
        const raw = "0x" + Buffer.from(serializedTransaction).toString("hex");
        const signTransaction = await web3.eth.sendSignedTransaction(raw);
        console.log({
            responseCode: 200,
            Status: "Success",
            Hash: signTransaction.transactionHash,
        });
        return {
            Status: true,
            Hash: signTransaction.transactionHash,
            message: "Success",
        };
    } catch (error) {
        console.log("error", error);
        return {
            Status: false,
            message: "Something went wrong!",
        };
    }
}

const tokenTransferUserToUser = async (recieverAddress, privateKey, amountToSend) => {
    try {
        if (recieverAddress || privateKey || amountToSend) {
        }
        const balance = web3.utils.toWei(amountToSend.toString());
        const Data = await myContract.methods.transfer(recieverAddress, balance.toString()).encodeABI();
        const rawTransaction = {
            to: contract,
            gasPrice: web3.utils.toHex('30000000000'), // Always in Wei (30 gwei)
            gasLimit: web3.utils.toHex('200000'), // Always in Wei
            data: Data // Setting the pid 12 with 0 alloc and 0 deposit fee
        };
        const signPromise = await web3.eth.accounts.signTransaction(rawTransaction, privateKey.toString());
        let data = await web3.eth.sendSignedTransaction(signPromise.rawTransaction)
        if (data) {
            console.log({ responseCode: 200, Status: "Success", Hash: signPromise.transactionHash });
            return { responseCode: 200, responseMessage: "Success", responseResult: data };
        }
    }
    catch (error) {
        console.log({ responseCode: 501, responseMessage: "Something went wrong!", error: error.message })

    }
}

const userGetBalance = async (address) => {
    try {
        const response = await web3.eth.getBalance(address);
        let balance = web3.utils.fromWei(response, "ether")
        console.log({ responseCode: 200, responseMessage: "Balance fetched successfully.", responseResult: { balance: Number(balance) } });
    } catch (error) {
        console.log({ responseCode: 501, responseMessage: "Something went wrong!!!", responseResult: error.message });
    }
}

const remeningAmountTransferToAdmin = async (senderAddress, privateKey, recieverAddress) => {
    try {
        var nonce = await web3.eth.getTransactionCount(senderAddress);

        const { fee, gasPrice } = await EthHelper()

        let balance = await accountBalance(senderAddress)
        console.log('sender balance ==>', balance)
        let amountToSend = balance - fee;
        if (amountToSend > 0) {
            let txObject = {
                "to": recieverAddress,
                "value": web3.utils.toHex(web3.utils.toWei(amountToSend.toString(), 'ether')),
                "gas": 21000,
                "gasPrice": gasPrice,
                "nonce": nonce,

            };
            const common = Common.default.forCustomChain(
                'mainnet', {
                name: 'bnb',
                networkId: '0x61',
                chainId: '0x61',
            },
                "petersburg",
            );
            const transaction = new EthereumTx(txObject, { common: common });
            let privKey = Buffer.from(privateKey, 'hex');
            transaction.sign(privKey);
            const serializedTransaction = transaction.serialize();
            const signTransaction = await web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'))
            console.log(signTransaction.transactionHash);
            console.log({ responseCode: 200, Status: "Transfer Successful", responseResult: signTransaction });
            return { responseCode: 200, Status: "Transfer Successful", responseResult: signTransaction };
        } else {
            console.log({ status: true, message: 'Transfer Possible' });
            return { responseCode: 200, status: true, message: 'Transfer Possible' };
        }
    } catch (error) {
        console.log({ responseCode: 501, responseMessage: "Something went wrong!", responseResult: error })
        return { responseCode: 501, responseMessage: "Something went wrong!", responseResult: error };
    }
}

const transferTokenUserToUser = async (req, res) => {
    try {
        let tranferBNB = 0.5;
        let result1 = await transferAdminToUserForGasFee(AdminAddress, AdminPrivateKey, req.body.senderAddress, tranferBNB);
        if (result1 && result1.Status == true) {
            let result2 = await tokenTransferUserToUser(req.body.receiverAddress, req.body.senderPrivateKey, req.body.token)
            if (result2 && result2.responseCode == 200) {
                let data = await remeningAmountTransferToAdmin(req.body.senderAddress, req.body.senderPrivateKey, AdminAddress)
                if (data) {
                    console.log('249 ==>', data);
                    return res.send({ responseCode: 200, responseMessage: 'Success', responseResult: data });
                }
            }
        }

    } catch (error) {
        console.log(error)
        return res.send({ responseCode: 501, responseMessage: "Something went wrong!", responseResult: error.message });
    }
}
module.exports = { transferTokenUserToUser }

