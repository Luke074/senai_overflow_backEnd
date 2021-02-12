const Question = require("../models/Question");
const Student = require("../models/Student");
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
          [Op.or]: [
            {
              title: { [Op.like]: `%${search}%` },
            },
            {
              description: { [Op.like]: `%${search}%` },
            },
          ],
        },
        order: [["created_at", "DESC"]],
        attributes: [
          "id",
          "title",
          "description",
          "image",
          "gist",
          "created_at",
        ],
        include: [
          {
            association: "Student",
            attributes: ["id", "name", "email", "image"],
          },
          {
            association: "Answers",
            attributes: ["id", "description", "created_at"],
            include: {
              association: "Student",
              attributes: ["id", "name", "image"],
            },
          },
          {
            association: "Categories",
            attributes: ["id", "description"],
            through: { attributes: [] },
          },
        ],
      });

      return res.status(201).send(questions);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};