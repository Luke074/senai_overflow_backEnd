const express = require("express");

const alunosController = require("./controllers/alunos");
const perguntasController = require("./controllers/perguntas");
const answerController = require("./controllers/respostas");

const routes = express.Router();

//Rotas de Alunos
routes.get("/alunos", alunosController.listarAlunos);
routes.get("/alunos/:id", alunosController.buscarAluno);
routes.post("/alunos", alunosController.adicionarAlunos);
routes.delete("/alunos/:id", alunosController.deletarAluno);
routes.put("/alunos/:id", alunosController.editarAluno);

//Rotas de perguntas
routes.get("/perguntas", perguntasController.index);
routes.post("/perguntas", perguntasController.store);
routes.put("/perguntas/:id", perguntasController.update);
routes.delete("/perguntas/:id", perguntasController.delete);

//Rotas de respostas
routes.post("/perguntas/:id/resposta", answerController.store);

module.exports = routes;