const Question = require("../Models/Question");
const Student = require("../Models/Student");

module.exports = {
    async index(req, res) {
        try {
            const questions = await Question.findAll();

            res.send(questions);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    async store(req, res) {
        const { titulo, descricao, imagem, gist, categorias } = req.body;

        const alunoId = req.headers.authorization

        try {
            //buscar aluno pelo ID
            let aluno = await Student.findByPk(alunoId);

            //se aluno existir, retorna erro
            if (!aluno)
                return res.status(404).send({ error: "Aluno não encontrado" });

            //crio a pergunta para o aluno
            let pergunta = await aluno.createQuestion({ titulo, descricao, imagem, gist });

            await pergunta.addCategories(categorias);

            //retorno sucesso
            res.status(201).send(pergunta);

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },
    async find(req, res) {

    },
    async update(req, res) {
        const questionId = req.params.id;
        const { titulo, descricao } = req.body;
        const studentId = req.headers.authorization;

        try {
            const question = await Question.findByPk(questionId);

            if (!question)
                return res.status(404).send({ erro: "Questao nao encontrada" });

            if (!studentId)
                return res.status(404).send({ erro: "Voce nao tem autorizacao" });

            question.titulo = titulo;
            question.descricao = descricao;

            question.save();

            res.status(204).send("pergunta Atualizada!");
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },
    async delete(req, res) {
        const questionId = req.params.id;

        const studentId = req.headers.authorization;

        try {
            const question = await Question.findOne({
                where: {
                    id: questionId,
                    aluno_id: studentId
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