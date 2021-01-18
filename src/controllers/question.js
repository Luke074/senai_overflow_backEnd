const Question = require("../Models/Question");
const Student = require("../Models/Student");
const Answer = require("../Models/Answer");

module.exports = {
    async index(req, res) {
        const question = await Question.findAll();

        try {
            res.status(202).send(question);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },
    async store(req, res) {
        const { title, description, image, gist, categories } = req.body;

        const alunoId = req.headers.authorization

        try {
            //buscar aluno pelo ID
            let aluno = await Student.findByPk(alunoId);

            //se aluno existir, retorna erro
            if (!aluno)
                return res.status(404).send({ error: "Aluno não encontrado" });

            //crio a pergunta para o aluno
            let question = await aluno.createQuestion({ title, description, image, gist });

            await question.addCategories(categories);

            //retorno sucesso
            res.status(201).send(question);

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },
    async find(req, res) {

    },
    async update(req, res) {
        const questionId = req.params.id;
        const { title, description } = req.body;
        const studentId = req.headers.authorization;

        try {
            const question = await Question.findByPk(questionId);

            if (!question)
                return res.status(404).send({ error: "Questao nao encontrada" });

            if (!studentId)
                return res.status(404).send({ error: "Voce nao tem autorizacao" });

            console.log(question);

            question.title = title;
            question.description = description;

            question.save();

            res.status(204).send("pergunta Atualizada!");
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },
    async delete(req, res) {
        const questionId = req.params.id;
        const { authorization } = req.headers;

        try {
            const question = await Question.findOne({
                where: {
                    id: questionId,
                    student_id: authorization
                }
            });

            if (!question)
                res.status(404).send({ error: "Questão não encontrada!" });

            await question.destroy();

            return res.status(204).send("pergunta apagada com sucesso");

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

    }
}