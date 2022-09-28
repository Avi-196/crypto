const router = require("express").Router();
const MATICController = require("../controllers/maticController");
const transferTokenController = require("../controllers/transferTokenUserToUser");
const finalStakingController = require("../controllers/finalStakingController");

/**
 * @swagger
 * /matic/generateMnemonic:
 *   get:
 *     tags:
 *       - MATIC-TOKEN
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: mnemonic generate Succeessfully
 *       400:
 *         description: Not found
 */
router.get("/generateMnemonic", MATICController.generateMnemonic);

/**
 * @swagger
 * /matic/generateAddress:
 *   get:
 *     tags:
 *       - MATIC-TOKEN
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mnemonic
 *         description:
 *         in: query
 *         required: true
 *       - name: count
 *         description:
 *         in: query
 *         required: false
 *     responses:
 *       200:
 *         description: account generate Successfully
 *       400:
 *         description: Not found
 */
router.get("/generateAddress", MATICController.generateAddress);

/**
 * @swagger
 * /matic/getBalance:
 *   get:
 *     tags:
 *       - MATIC-TOKEN
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: address
 *         description: address
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: account balance fetch Successfully
 *       400:
 *         description: Not found
 */
router.get("/getBalance", MATICController.getBalance);

/**
 * @swagger
 * /matic/getStakingBalance:
 *   get:
 *     tags:
 *       - DEPOSITE-TOKEN
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: address
 *         description: address
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: account balance fetch Successfully
 *       400:
 *         description: Not found
 */
router.get("/getStakingBalance", finalStakingController.getStakingBalance);

/**
 * @swagger
 * /matic/withdraw:
 *   post:
 *     tags:
 *       - MATIC-TOKEN
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: privateKey
 *         description:
 *         in: formData
 *         required: true
 *       - name: recieverAddress
 *         description:
 *         in: formData
 *         required: true
 *       - name: amountToSend
 *         description:
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: amount transfer Successfully
 *       400:
 *         description: Not found
 */
router.post("/withdraw", MATICController.withdraw);

/**
 * @swagger
 * /matic/transfer:
 *   post:
 *     tags:
 *       - MATIC-TOKEN
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: senderAddress
 *         description:
 *         in: formData
 *         required: true
 *       - name: privateKey
 *         description:
 *         in: formData
 *         required: true
 *       - name: recieverAddress
 *         description:
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: amount transfer Successfully
 *       400:
 *         description: Not found
 */
router.post("/transfer", MATICController.transfer);

/**
 * @swagger
 * /matic/transferTokenUserToUser:
 *   post:
 *     tags:
 *       - MATIC-TOKEN
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: senderAddress
 *         description:
 *         in: formData
 *         required: true
 *       - name: senderPrivateKey
 *         description:
 *         in: formData
 *         required: true
 *       - name: receiverAddress
 *         description:
 *         in: formData
 *         required: true
 *       - name: token
 *         description:
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: amount transfer Successfully
 *       404:
 *         description: Not found
 */
router.post(
  "/transferTokenUserToUser",
  transferTokenController.transferTokenUserToUser
);

/**
 * @swagger
 * /matic/depositeToken:
 *   post:
 *     tags:
 *       - DEPOSITE-TOKEN
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: privateKey
 *         description:
 *         in: formData
 *         required: true
 *       - name: senderAddress
 *         description:
 *         in: formData
 *         required: true
 *       - name: amountToDeposite
 *         description:
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: amount transfer Successfully
 *       400:
 *         description: Not found
 */
router.post("/depositeToken", finalStakingController.depositeToken);

/**
 * @swagger
 * /matic/withdrawTokens:
 *   post:
 *     tags:
 *       - DEPOSITE-TOKEN
 *     description: Check for Social existence and give the access Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: privateKey
 *         description:
 *         in: formData
 *         required: true
 *       - name: senderAddress
 *         description:
 *         in: formData
 *         required: true
 *       - name: amountToDeposite
 *         description:
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: withdrawal Successfully
 *       400:
 *         description: Not found
 */
router.post("/withdrawTokens", finalStakingController.withdrawTokens);

module.exports = router;
