'use strict'
var Ventas = require('../models/ventas');
var mongoose = require('mongoose');

var controller = {
    getCategory: (req, res) =>{
        var query = Ventas.aggregate([{
            $project: {products: 1, _id: 0}
            }, 
            {$unwind: "$products"},
            {$group: {_id:"$products.category", total: {$sum: "$products.price"}}},
            {$project: {_id: 0, catName: "$_id", total: {$round: [{$divide: ["$total", 1000000]}, 1]}}}
            ])
        query.exec((err, category) => {
            if (err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener la información'
                });
            }

            return res.status(200).send({
                status: 'success',
                category
            });
        });
    },
    getGeneral: (req, res) => {
        var query = Ventas.aggregate([
            {$project: 
                {diff:{$subtract:
                    [{$dateFromString: {dateString: '$date_closed'}},{$dateFromString: {dateString: '$date_opened'}}]
                }, total: 1, _id: 0
            }},
        ]);
        query.exec((err, general) => {
            if (err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener la información'
                });
            }

            return res.status(200).send({
                status: 'success',
                general
            });
        });

    },
    getDateData: (req, res) => {
        var query = Ventas.aggregate([
            {$project: {_id: 0, date_opened: {$dateFromString: {dateString: '$date_closed'}}, diners: 1, total:1}},
            {$group: {_id: {year: {$year: "$date_opened"}, month:{$month: "$date_opened"}, day:{$dayOfMonth:"$date_opened"}}, diners: {$sum: "$diners"}, total:{$sum: "$total"}}},
            {$project: {_id: 0, date: {year: "$_id.year", month: "$_id.month", day: "$_id.day"}, data: {diners:"$diners", total:{$round: [{$divide:["$total", 1000000]}, 1]}}}},
            {$sort: {"date.year":-1, "date.month":-1, "date.day":-1}},
            {$limit: 30}
        ])
        query.exec((err, datedata) => {
            if (err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener la información'
                });
            }

            return res.status(200).send({
                status: 'success',
                datedata
            });
        });
    },
    getTopProducts: (req, res) => {
        var query = Ventas.aggregate([
            {$project: {"products.name": 1, "products.quantity":1, _id: 0}},
            {$unwind: "$products"},
            {$group: {_id: "$products.name", total: {$sum: "$products.quantity"}}},
            {$project: {_id: 0, name: "$_id", quantity: "$total"}},
            {$sort: {"quantity": -1}},
            {$limit: 5}
        ]);
        query.exec((err, topproducts) => {
            if (err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener la información'
                });
            }

            return res.status(200).send({
                status: 'success',
                topproducts
            });
        });
    },
    getIncomeRecord: (req, res) => {
        var query = Ventas.aggregate([
            {$project: {_id: 0, date_opened: {$dateFromString: {dateString: '$date_closed'}}, diners: 1, total:1}},
            {$group: {_id: {year: {$year: "$date_opened"}, month:{$month: "$date_opened"}, day:{$dayOfMonth:"$date_opened"}}, diners: {$sum: "$diners"}, total:{$sum: "$total"}}},
            {$project: {_id: 0, date: {year: "$_id.year", month: "$_id.month", day: "$_id.day"}, data: {diners:"$diners", total:{$round: [{$divide:["$total", 1000000]}, 1]}}}},
            {$sort: {"data.total":-1}},
            {$limit: 1},
            {$project: {record: "$data.total"}}
        ])
        query.exec((err, incomerecord) => {
            if (err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener la información'
                });
            }

            return res.status(200).send({
                status: 'success',
                incomerecord
            });
        });
    },
    getTotalIncome: (req, res) => {
        var query = db.Ventas.aggregate([
            {$project: {total: 1}},
            {$group: {_id: "$id", totalIncome: {$sum: "$total"}}},
            {$project: {_id: 0, totalIncome: 1}}
        ]);
        query.exec((err, totalincome) => {
            if (err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener la información'
                });
            }

            return res.status(200).send({
                status: 'success',
                totalincome
            });
        });
    }
}

module.exports = controller;