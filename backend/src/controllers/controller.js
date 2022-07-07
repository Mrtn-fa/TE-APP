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
    getMeanTime: (req, res) => {
        var query = Ventas.aggregate([
            {$project: {
                diff:{$subtract:
                    [{$dateFromString: {dateString: '$date_closed'}},{$dateFromString: {dateString: '$date_opened'}}]
                }
            }},
            {$group: {_id:"meanTime [minutes]", meanTime: {$avg: {$sum: {$divide: ["$diff", 60000] }}}}},
            {$project: {_id: new mongoose.Types.ObjectId(), meanTime: {$round: ["$meanTime", 0]}}}
        ]);
        query.exec((err, meantime) => {
            if (err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener la información'
                });
            }

            return res.status(200).send({
                status: 'success',
                meantime
            });
        });

    }
    
}

module.exports = controller;