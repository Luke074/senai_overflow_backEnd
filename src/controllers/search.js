const Student = require("../Models/Student");
const Question = require("../Models/Question");
const { Op } = require("sequelize");

module.exports = {
    async index(req, res) {
        const { studentId } = req;

        const { search } = req.body;

        const student = await Student.findByPk(studentId);

        try {
            if (!student) return res.status(404).send("Usuario não encontrado!");

            const questions = await Question.findAll({
                where: {
                    [Op.or]: [{
                            title: {
                                [Op.like]: `${search}`,
                            },
                        },
                        {
                            description: {
                                [Op.like]: `${search}`,
                            },
                        },
                    ],
                },
                order: [
                    ["created_at", "DESC"]
                ],
                attributes: ["id", "title", "description", "image", "gist", "created_at"],
                include: [{
                    association: "Student",
                    attributes: ["id", "name", "image"]
                }, {
                    association: "Answers",
                    attributes: ["id", "description", "created_at"],
                    include: {
                        association: "Student",
                        attributes: ["id", "name", "image"]
                    },
                }, {
                    association: "Categories",
                    through: { attributes: [] },
                    attributes: ["id", "description"]
                }],
            });

            res.status(201).send(questions);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
};
// const questions = await Question.findAll({
//     where: {
//         [Op.or]: [{
//                 title: {
//                     [Op.like]: `%${search}%`,
//                 },
//             },
//             {
//                 description: {
//                     [Op.like]: `%${search}%`,
//                 },
//             },
//         ],
//     },
//     order: [
//         ["created_at", "DESC"]
//     ],
//     attributes: ["id", "title", "description", "image", "gist", "created_at"],
//     include: [{
//         association: "Student",
//         attributes: ["id", "name", "image"]
//     }, {
//         association: "Answers",
//         attributes: ["id", "description", "created_at"],
//         include: {
//             association: "Student",
//             attributes: ["id", "name", "image"]
//         },
//     }, {
//         association: "Categories",
//         through: { attributes: [] },
//         attributes: ["id", "description"]
//     }],
// });