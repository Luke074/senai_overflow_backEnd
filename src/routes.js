const express = require("express");
// const Multer = require("multer");

// const multer = Multer({
//     storage: Multer.memoryStorage(),
//     limits: 1024 * 1024,
// });

// const uploads = multer.single("arquivos");
// routes.post("/uploads", multer.single("arquivo"), (req, res) => {

//     const hadleError = (error) => {
//         if (error) {
//             res.status(400).send({ error: "Arquivo invalido" });
//         }
//         console.log(req.file);
//         res.send(req.file);
//     }
//     uploads(req, res, hadleError);
// });

const authMiddleware = require("./middleware/authorization");
const uploadSingleImage = require("./middleware/uploadSingleImage");
const uploadFirebase = require("./services/uploadFirebase");

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
const categoriesController = require("./controllers/categories");
const imageStudentController = require("./controllers/imageStudent");

const routes = express.Router();

//rotas publicas
routes.post("/sessions", sessionController.store);
routes.post("/students", validatorStudents.create, studentController.store);

routes.use(authMiddleware);

//rotas de categorias
routes.get("/categories", categoriesController.index);

//Rotas privadas

//Rotas de Alunos
routes.get("/students", studentController.index);
routes.get("/students/:id", studentController.find);
routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);

//rota da imagem do estudante
routes.post("/students/:id/images", 
    uploadSingleImage, 
    uploadFirebase,
    imageStudentController.store
);

//Rotas de perguntas
routes.get("/questions", questionController.index);
routes.post("/questions",
    uploadSingleImage,
    uploadFirebase,
    validatorQuestion.create,
    questionController.store
);
routes.put("/questions/:id", questionController.update);
routes.delete("/questions/:id", questionController.delete);

//Rotas de respostas
routes.post("/questions/:id/answers", validatorAnswer.create, answerController.store);

//Rotas do feed
routes.get("/feed", feedController.index);

module.exports = routes;