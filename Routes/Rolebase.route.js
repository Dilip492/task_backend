const express = require('express')

const router = express.Router();

const isAuthorized = require("../middleware/IsAuthorized.middleware")
const checkRole = require("../middleware/checkRole.middleware")

const { Roles } = require('../Constants/roles')


router.get('/admin-dashboard', isAuthorized, checkRole([Roles.ADMIN]), (req, res) => {
    res.status(200).json({ message: 'Welcome, Admin!' });
});


router.get('/seller-dashboard', isAuthorized, checkRole([Roles.SELLER]), (req, res) => {
    res.status(200).json({ message: 'Welcome, Seller!' });
});


router.get('/customer-dashboard', isAuthorized, checkRole([Roles.CUSTOMER]), (req, res) => {
    res.status(200).json({ message: 'Welcome, Customer!' });
});

module.exports = router;