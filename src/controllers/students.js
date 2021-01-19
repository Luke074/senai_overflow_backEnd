const Student = require("../Models/Student");
const bcryptjs = require("bcryptjs");
const auth = require("../config/auth.json");
const jwt = require("jsonwebtoken");

module.exports = {
    //função que vai ser usada na rota
    async index(req, res) {

        try {
            const student = await Student.findAll();

            res.send(student);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },
    async find(req, res) {
        //recuperar o id do aluno
        const studentId = req.params.id;

        try {
            //buscar aluno pelo id 
            let student = await Student.findByPk(studentId, {
                attributes: ["id", "ra", "name", "email"]
            })

            //se aluno nao encontrado, retorna not found
            if (!student)
                return res.status(404).send({ erro: "Aluno não encontrado" });

            res.send(student);

        } catch (error) {
            res.status(500).send({ error })
        }

    },
    async store(req, res) {
        //recebe os dados
        const { ra, name, email, password } = req.body;

        try {

            //SELECT * FROM alunos WHERE ra = ?
            let student = await Student.findOne({
                where: {
                    ra: ra
                }
            });

            if (student)
                res.status(400).send({ error: "Aluno ja cadastrado" });

            const passwordCript = bcryptjs.hashSync(password);

            student = await Student.create({ ra, name, email, password: passwordCript });

            const token = jwt.sign({
                studentId: student.id,
                studentName: student.name
            }, auth.secret);

            res.status(200).send({
                student: {
                    studentId: student.id,
                    studentName: student.name,
                    studentRa: student.ra,
                    studentEmail: student.email
                },
                token
            });

        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    async delete(req, res) {
        //recuperar o id do aluno
        const studentId = req.params.id

        try {
            let student = await Student.findByPk(studentId);

            if (!student)
                return res.status(404).send({ error: "aluno não encontrado" });

            await student.destroy();

            //devolver resposta de sucesso
            res.status(204).send();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }


    },
    async update(req, res) {
        //recuperar o id do aluno
        const studentId = req.params.id

        //recuperar os dados do corpo
        const { name, email } = req.body;

        try {
            let student = await Student.findByPk(studentId);

            if (!student)
                res.status(404).send({ error: "Aluno não encontrado" });

            student.nome = name;
            student.email = email;

            student.save();

            //retornar resposta
            res.status(204).send("Atualzado com Sucesso!");
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    }

}