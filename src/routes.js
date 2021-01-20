const express = require("express");
const Multer = require("multer");

const authMiddleware = require("./middleware/authorization");

//validators middlewares
const validatorStudents = require("./validator/students");
const validatorQuestion = require("./validator/questions");
const validatorAnswer = require("./validator/anwsers");

//controllers
const studentController = require("./controllers/students");
const questionController = require("./controllers/question");
const answerController = require("./controllers/answers");
const feedController = require("./controllers/feed");
const sessionController = require("./controllers/sessions");

const routes = express.Router();
const multer = Multer({
    storage: Multer.diskStorage({
        destination: "uploads/",
        filename: (req, file, callback) => {
            const filename = Date.now() + "." + req.file.originalname.split(".").pop();

            return callback(null, filename);
        }
    })
});

routes.post("/upload", multer.single("arquivo"), (req, res) => {
    console.log(req.file);

    res.send(req.file);
});

//rotas publicas
routes.post("/sessions", sessionController.store);
routes.post("/students", validatorStudents.create, studentController.store);

routes.use(authMiddleware);

//Rotas privadas
//Rotas de Alunos
routes.get("/students", studentController.index);
routes.get("/students/:id", studentController.find);
routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);

//Rotas de perguntas
routes.get("/questions", questionController.index);
routes.post("/questions", validatorQuestion.create, questionController.store);
routes.put("/questions/:id", questionController.update);
routes.delete("/questions/:id", questionController.delete);

//Rotas de respostas
routes.post("/questions/:id/answers", validatorAnswer.create, answerController.store);

//Rotas do feed
routes.get("/feed", feedController.index);

module.exports = routes;