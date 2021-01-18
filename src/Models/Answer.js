const { Model, DataTypes } = require("sequelize");

class Answer extends Model {
    //aqui iniciamos nossos campos da tabela
    static init(sequelize) {
        super.init({
            description: DataTypes.STRING,
            student_id: DataTypes.INTEGER
        }, {
            sequelize,
        })
    }

    /* aqui configuramos os relacionamentos*/
    static associate(models) {
        this.belongsTo(models.Question);
        this.belongsTo(models.Student);
    }
}

module.exports = Answer;