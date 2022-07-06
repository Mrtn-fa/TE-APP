'use strict'
var express = require("express");
var Ventas = require('../controllers/controller')

var router = express.Router();

router.get('/getVentas', Ventas.getVentas);

module.exports = router;