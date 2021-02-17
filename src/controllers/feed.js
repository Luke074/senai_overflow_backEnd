const Question = require("../Models/Question");
const Student = require("../Models/Student");
const Answer = require("../Models/Answer");

module.exports = {
    async index(req, res) {

        let pages = req.query.pages;
        pages = pages - 1;

        try {
            const feed = await Question.findAll(
                {
                    attributes: ["id", "title", "description", "image", "gist", "created_at", "StudentId"],
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
                    order: [
                        ["created_at", "DESC"]
                    ],
                    limit: [5 * pages, 5],
                });

            res.send(feed);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    }
}