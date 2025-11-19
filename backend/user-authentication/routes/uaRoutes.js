// This file defines routes for the user authentication side of the
// application. These endpoints allow users to login, register for the site,
// and log out once done.
// Each route delegates request handling to controller functions
// in auController.js.



const express = require('express');
const router = express.Router();

const { userLogin, userRegister, userLogout, verifyUsingJWT } = require('../controllers/uaController');

router.post('/login', userLogin);
router.post('/register', userRegister);
router.post('/logout', userLogout);

module.exports = router;
