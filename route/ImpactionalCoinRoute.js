const router = require("express").Router();
const Controller = require("../controllers/ImpactionalCoinController");

/**
 * @swagger
 * /ImpactionalCoinSwap/name:
 *   get:
 *     tags:
 *       - Impactional Coin Swap
 *     description: Check for name of the Token
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: name fetched Succeessfully
 *       400:
 *         description: Not found
 */
router.get("/name", Controller.name);

/**
 * @swagger
 * /ImpactionalCoinSwap/symbol:
 *   get:
 *     tags:
 *       - Impactional Coin Swap
 *     description: Check for symbol of the Token
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: symbol fetched Succeessfully
 *       400:
 *         description: Not found
 */
router.get("/symbol", Controller.symbol);

/**
 * @swagger
 * /ImpactionalCoinSwap/decimals:
 *   get:
 *     tags:
 *       - Impactional Coin Swap
 *     description: Check for decimals of the Token
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: decimals fetched Succeessfully
 *       400:
 *         description: Not found
 */

router.get("/decimals", Controller.decimals);

/**
 * @swagger
 * /ImpactionalCoinSwap/totalSupply:
 *   get:
 *     tags:
 *       - Impactional Coin Swap
 *     description: Check for totalSupply of the Token
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: totalSupply fetched Succeessfully
 *       400:
 *         description: Not found
 */
router.get("/totalSupply", Controller.totalSupply);

/**
 * @swagger
 * /ImpactionalCoinSwap/balanceOf:
 *   get:
 *     tags:
 *       - Impactional Coin Swap
 *     description: Check for balanceOf of an Address
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: address
 *         description:
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Balance fetched Succeessfully
 *       400:
 *         description: Not found
 */
router.get("/balanceOf", Controller.balanceOf);

/**
 * @swagger
 * /ImpactionalCoinSwap/allowance:
 *   get:
 *     tags:
 *       - Impactional Coin Swap
 *     description: Check for allowance
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: owner
 *         description:
 *         in: query
 *         required: true
 *       - name: spender
 *         description:
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: allowance fetched Succeessfully
 *       400:
 *         description: Not found
 */
router.get("/allowance", Controller.allowance);

/**
 * @swagger
 * /ImpactionalCoinSwap/contractBalance:
 *   get:
 *     tags:
 *       - Impactional Coin Swap
 *     description: Check for contractBalance
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: contractBalance fetched Succeessfully
 *       400:
 *         description: Not found
 */
router.get("/contractBalance", Controller.contractBalance);

/**
 * @swagger
 * /ImpactionalCoinSwap/transfer:
 *   post:
 *     tags:
 *       - Impactional Coin Swap
 *     description: Check for transfer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: privateKey
 *         description:
 *         in: query
 *         required: true
 *       - name: amount
 *         description:
 *         in: query
 *         required: true
 *       - name: to
 *         description:
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: transfered Succeessfully
 *       400:
 *         description: Not found
 */
router.post("/transfer", Controller.transfer);

/**
 * @swagger
 * /ImpactionalCoinSwap/approve:
 *   post:
 *     tags:
 *       - Impactional Coin Swap
 *     description: Check for approve
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: amount
 *         description:
 *         in: query
 *         required: true
 *       - name: spender
 *         description:
 *         in: query
 *         required: true
 *       - name: privateKey
 *         description:
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: approved Succeessfully
 *       400:
 *         description: Not found
 */
router.post("/approve", Controller.approve);

/**
 * @swagger
 * /ImpactionalCoinSwap/transferFrom:
 *   post:
 *     tags:
 *       - Impactional Coin Swap
 *     description: Check for Transfer from
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: amount
 *         description:
 *         in: query
 *         required: true
 *       - name: from
 *         description:
 *         in: query
 *         required: true
 *       - name: to
 *         description:
 *         in: query
 *         required: true
 *       - name: privateKey
 *         description:
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: transfered Succeessfully
 *       400:
 *         description: Not found
 */
router.post("/transferFrom", Controller.transferFrom);

/**
 * @swagger
 * /ImpactionalCoinSwap/redeem:
 *   post:
 *     tags:
 *       - Impactional Coin Swap
 *     description: Check for redeem
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: privateKey
 *         description:
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: redeemed Succeessfully
 *       400:
 *         description: Not found
 */
router.post("/redeem", Controller.redeem);

/**
 * @swagger
 * /ImpactionalCoinSwap/buyToken:
 *   post:
 *     tags:
 *       - Impactional Coin Swap
 *     description: Check for buy Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: privateKey
 *         description:
 *         in: query
 *         required: true
 *       - name: amount
 *         description: Amount in Wei
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Bought Succeessfully
 *       400:
 *         description: Not found
 */
router.post("/buyToken", Controller.buyToken);

module.exports = router;
