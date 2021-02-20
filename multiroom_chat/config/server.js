//importar modulo frameork express, modulos consign body-parser express-validator
const express = require('express');
const consing = require('consign');
const bodyParser = require('body-parser');
const expresValidator = require('express-validator');

//iniciar  o objeto do express
var app = express();
//setar as váriaveis view engine e views do express
app.set('view engine', 'ejs');
app.set('views', './app/views');
//configurando o middleware express.static
app.use(express.static('./app/public'));
//configurar o middlwware body-parser
app.use(bodyParser.urlencoded({extended:true}));
//configurar omidleware express-validator
app.use(expresValidator());
//configurar o consign (autoload)
consing()
.include('app/routes')
.then('app/models')
.then('app/controllers')
.into(app);
//exportando o objeto app
module.exports = app;