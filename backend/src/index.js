'use strict'

require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
var mongoose = require('mongoose');
const app = express();
var ventas_url = require("./routes/ventas");

const port = process.env.port || 8099;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method");
    response.header("Access-Control-Allow-Methods", "GET, POST");
    response.header("Allow", "GET, POST");
    next();
});

app.use('/api', ventas_url);
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}).then(() => {
    console.log("MongoDB connection: SUCCESS");
    app.listen(port, () => {
        console.log(`Iniciando server en el puerto ${port}`);
    })
});