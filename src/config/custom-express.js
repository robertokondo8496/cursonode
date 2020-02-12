require('marko/node-require')
require('marko/express')

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}))

const rotas = require('../app/rotas/rotas');
rotas(app);
console.log('servidor iniciado')

module.exports = app;