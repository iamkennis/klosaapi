const express = require('express');
const VendorController = require('../controller/vendorController');

const router = express.Router();

router.post('/sign-up', VendorController.registerVendor);
router.post('/login',VendorController.loginVendor)




module.exports = router;