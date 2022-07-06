'use strict'
const {mongoose} = require('../mongo')
var Schema = mongoose.Schema;


var Ventas = new Schema({
    date_closed: Date,
    zone: String,
    waiter: String,
    cashier: String,
    products: [{
        category: String,
        price: Number,
        name: String,
        quantity: Number
    }],
    diners: Number,
    date_opened: Date,
    table: Number,
    total: Number,
    id: String,
    payments: [{
        amount: Number,
        _type: String
    }],
});

module.exports = mongoose.model("Ventas", Ventas, "Ventas");

