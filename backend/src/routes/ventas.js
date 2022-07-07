'use strict'
var express = require("express");
var Ventas = require('../controllers/controller')

var router = express.Router();

router.get('/getCategory', Ventas.getCategory);
router.get('/getMeanTime', Ventas.getMeanTime);

module.exports = router;