const Category = require("../Models/Category");

module.exports = {
  async index(req, res) {
    try {
      const categories = await Category.findAll();

      res.status(200).send(categories);
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  },
};