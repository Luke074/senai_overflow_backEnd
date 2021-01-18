const express = require("express");

const studentController = require("./controllers/students");
const questionController = require("./controllers/question");
const answerController = require("./controllers/answers");
const feedController = require("./controllers/feed")

const routes = express.Router();

//Rotas de Alunos
routes.get("/students", studentController.index);
routes.get("/students/:id", studentController.find);
routes.post("/students", studentController.store);
routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);

//Rotas de perguntas
routes.get("/questions", questionController.index);
routes.post("/questions", questionController.store);
routes.put("/questions/:id", questionController.update);
routes.delete("/questions/:id", questionController.delete);

//Rotas de respostas
routes.post("/questions/:id/answers", answerController.store);

//Rotas do feed
routes.get("/feed", feedController.index);

module.exports = routes;