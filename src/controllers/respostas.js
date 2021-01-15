const Question = require("../Models/Question");
const Student = require("../Models/Student");
const Answer = require("../Models/Answer");

module.exports = {
    async index(req, res) {

    },
    async store(req, res) {
        const questionId = req.params.id;
        const studentId = req.headers.authorization;
        const description = req.body.descricao;

        try {
            const question = await Question.findByPk(questionId);
            const student = await Student.findByPk(studentId);

            if (!question)
                return res.status(404).send({ erro: "Questao nao encontrada" });
            else if (!student)
                return res.status(404).send({ erro: "Voce nao tem autorizacao" });

            const answers = await question.createAnswer({ description: description, student_id: studentId });

            res.status(500).send(answers);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },
    find(req, res) {

    },
    update(req, res) {

    },
    delete(req, res) {

    }
}