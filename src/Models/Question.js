const { Model, DataTypes } = require("sequelize");

class Question extends Model {
    //aqui iniciamos nossos campos da tabela
    static init(sequelize) {
        super.init({
            titulo: DataTypes.STRING,
            descricao: DataTypes.STRING,
            imagem: DataTypes.STRING,
            gist: DataTypes.STRING
        }, {
            sequelize,
            tableName: "perguntas"
        })
    }

    /* aqui configuramos os relacionamentos*/
    static associate(models) {
        this.belongsTo(models.Student, { foreignKey: "aluno_id" });
        this.belongsToMany(models.Category, { through: "question_categories" });
        this.hasMany(models.Answer);
    }
}

module.exports = Question;