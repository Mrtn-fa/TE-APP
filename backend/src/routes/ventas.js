'use strict'
var express = require("express");
var Ventas = require('../controllers/controller')

var router = express.Router();

router.get('/getCategory', Ventas.getCategory);
router.get('/getGeneral', Ventas.getGeneral);
router.get('/getDateData', Ventas.getDateData);
router.get('/getTopProducts', Ventas.getTopProducts);
router.get('/getIncomeRecord', Ventas.getIncomeRecord);
router.get('/getTotalIncome', Ventas.getTotalIncome);

module.exports = router;