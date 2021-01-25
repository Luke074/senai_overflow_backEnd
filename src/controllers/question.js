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
        const { firebaseUrl } = req.file ? req.file : "";
        const { title, description, gist, categories } = req.body;
        const categoriesArray = categories.split(",");

        const { studentId } = req;

        try {
            //buscar aluno pelo ID
            let student = await Student.findByPk(studentId);

            //se aluno existir, retorna erro
            if (!student)
                return res.status(404).send({ error: "Aluno não encontrado" });

            //crio a pergunta para o aluno
            let question = await student.createQuestion({
                title,
                description,
                image: firebaseUrl,
                gist
            });

            await question.addCategories(categoriesArray);

            //retorno sucesso
            res.status(201).send({
                id: question.id,
                title: question.title,
                description: question.description,
                created_at: question.created_at,
                gist: question.gist,
                image: req.file.firebaseUrl,
            });

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
        const { studentId } = req;

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