const express = require("express");

const authMiddleware = require("./middleware/authorization");

const studentController = require("./controllers/students");
const questionController = require("./controllers/question");
const answerController = require("./controllers/answers");
const feedController = require("./controllers/feed");
const sessionController = require("./controllers/sessions");

const routes = express.Router();

//rotas publicas
routes.post("/sessions", sessionController.store);
routes.post("/students", studentController.store);

routes.use(authMiddleware);

//Rotas privadas
//Rotas de Alunos
routes.get("/students", studentController.index);
routes.get("/students/:id", studentController.find);
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