const { Model, DataTypes } = require("sequelize");

class Student extends Model {
    //aqui iniciamos nossos campos da tabela
    static init(sequelize) {
        super.init({
            ra: DataTypes.STRING,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        }, {
            sequelize,
        })
    }

    /* aqui configuramos os relacionamentos*/
    static associate(models) {
        this.hasMany(models.Question);
        this.hasMany(models.Answer);
    }
}

module.exports = Student;