const { Model, DataTypes } = require("sequelize");

class Category extends Model {
    //aqui iniciamos nossos campos da tabela
    static init(sequelize) {
        super.init({
            description: DataTypes.STRING
        }, {
            sequelize,
        })
    }

    /* aqui configuramos os relacionamentos*/
    static associate(models) {
        this.belongsToMany(models.Question, { through: "question_categories" });
    }
}

module.exports = Category;