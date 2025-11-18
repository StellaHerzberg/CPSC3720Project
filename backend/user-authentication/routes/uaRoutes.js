// This file defines routes for the client-facing side of the
// application. These endpoints allow clients to retrieve event
// listings and purchase tickets.
// Each route delegates request handling to controller functions
// in clientController.js.



const express = require('express');
const router = express.Router();

const { userLogin, userRegister, userLogout, verifyUsingJWT } = require('../controllers/uaController');

router.post('/login', userLogin);
router.post('/register', userRegister);
router.post('/logout', userLogout);

module.exports = router;
