const Student = require("../Models/Student");
const bcryptjs = require("bcryptjs");
const auth = require("../config/auth.json");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils");

module.exports = {
    async store(req, res) {
        const { email, password } = req.body;

        try {
            const student = await Student.findOne({
                where: {
                    email
                }
            });

            if (!student || !bcryptjs.compareSync(password, student.password))
                return res.status(403).send({ error: "Usuario e/ou senha inválidos" });

            const token = generateToken({
                studentId: student.id,
                studentName: student.name,
            });

            res.status(201).send({
                student: {
                    studentId: student.id,
                    name: student.name,
                    ra: student.ra,
                    email: student.email
                },
                token
            });

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
}