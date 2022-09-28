const router = require('express').Router();
const BEP20Controller = require('../controllers/bep20Controller');
const transferTokenController = require('../controllers/transferTokenUserToUser');


/**
* @swagger
* /bep20/generateMnemonic:
*   get:
*     tags:
*       - BEP20-TOKEN
*     description: Check for Social existence and give the access Token 
*     produces:
*       - application/json
*     responses:
*       200:
*         description: mnemonic generate Succeessfully
*       400:
*         description: Not found
*/
router.get('/generateMnemonic', BEP20Controller.generateMnemonic);


/**
* @swagger
* /bep20/generateAddress:
*   get:
*     tags:
*       - BEP20-TOKEN
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
router.get('/generateAddress', BEP20Controller.generateAddress);

/**
* @swagger
* /bep20/getBalance:
*   get:
*     tags:
*       - BEP20-TOKEN
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
router.get('/getBalance', BEP20Controller.getBalance);


/**
 * @swagger
 * /bep20/withdraw:
 *   post:
 *     tags:
 *       - BEP20-TOKEN
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
router.post('/withdraw', BEP20Controller.withdraw);



/**
 * @swagger
 * /bep20/transfer:
 *   post:
 *     tags:
 *       - BEP20-TOKEN
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
router.post('/transfer', BEP20Controller.transfer);

/**
 * @swagger
 * /bep20/transferTokenUserToUser:
 *   post:
 *     tags:
 *       - BEP20-TOKEN
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
 router.post('/transferTokenUserToUser', transferTokenController.transferTokenUserToUser);

module.exports =router;