//importa o Express
const express = require("express");

require("./database");

//importar as rotas
const routes = require("./routes");

const app = express();

app.use(express.json());

app.use(routes);


module.exports = app;