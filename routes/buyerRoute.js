const express = require('express');
const BuyerController = require('../controller/buyerController');

const router = express.Router();

router.post('/sign-up', BuyerController.registerBuyer);
router.post('/login', BuyerController.loginBuyer)



module.exports = router;