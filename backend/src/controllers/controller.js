'use strict'
var Ventas = require('../models/ventas')

var controller = {
    getVentas: (req, res) =>{
        var query = Ventas.find({});
        query.exec((err, ventas) => {
            if (err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener la información'
                });
            }

            return res.status(200).send({
                status: 'success',
                ventas
            });
        });
    }
    
}

module.exports = controller;