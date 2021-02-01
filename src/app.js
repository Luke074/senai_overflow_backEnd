//importa o Express
const express = require("express");
const { errors } = require("celebrate");

const cors = require("cors");

require("./database");

//importar as rotas
const routes = require("./routes");

const app = express();

app.use(express.json());

app.use(cors());

//Definimos a pasta uploads como publica, servindo arquivos estáticos
app.use("/uploads", express.static("uploads"));

app.use(routes);

app.use(errors());

module.exports = app;