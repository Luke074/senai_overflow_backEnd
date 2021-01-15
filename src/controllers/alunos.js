const Student = require("../Models/Student");

module.exports = {
    //função que vai ser usada na rota
    async listarAlunos(req, res) {

        try {
            const alunos = await Student.findAll();

            res.send(alunos);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },
    async adicionarAlunos(req, res) {
        //recebe os dados
        const { ra, nome, email, senha } = req.body;

        try {

            //SELECT * FROM alunos WHERE ra = ?
            let aluno = await Student.findOne({
                where: { ra }
            })

            if (aluno)
                res.status(400).send({ error: "Aluno ja cadastrado" });

            aluno = await Student.create({ ra, nome, email, senha });

            res.status(200).send(aluno);

        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }

        /*
        //incrementar o ultimo id
        const nextId = alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1;
        //adicionar o aluno na lista
        alunos.push({ id: nextId, ra, nome, email, senha });
        */
    },
    async deletarAluno(req, res) {
        //recuperar o id do aluno
        const alunoId = req.params.id

        try {
            let aluno = await Student.findByPk(alunoId);

            if (!aluno)
                return res.status(404).send({ error: "aluno não encontrado" });

            await aluno.destroy(aluno);

            //devolver resposta de sucesso
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }


    },

    async editarAluno(req, res) {
        //recuperar o id do aluno
        const alunoId = req.params.id

        //recuperar os dados do corpo
        const { nome, email } = req.body;

        try {
            let aluno = await Student.findByPk(alunoId);

            if (!aluno)
                res.status(404).send({ error: "Aluno não encontrado" });

            aluno.nome = nome;
            aluno.email = email;

            aluno.save();

            //retornar resposta
            res.status(204).send("Atualzado com Sucesso!");
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },

    async buscarAluno(req, res) {
        //recuperar o id do aluno
        const alunoId = req.params.id;

        try {
            //buscar aluno pelo id 
            let aluno = await Student.findByPk(alunoId, {
                attributes: ["id", "ra", "nome", "email"]
            })

            //se aluno nao encontrado, retorna not found
            if (!aluno)
                return res.status(404).send({ erro: "Aluno não encontrado" });

            res.send(aluno);

        } catch (error) {
            res.status(500).send({ error })
        }

    }

}