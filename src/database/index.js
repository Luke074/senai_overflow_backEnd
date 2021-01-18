const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//imports dos Models
const Student = require("../Models/Student");
const Question = require("../Models/Question");
const Category = require("../Models/Category");
const Answer = require("../Models/Answer");
const connection = new Sequelize(dbConfig);

//Inicializa os Models
Student.init(connection);
Question.init(connection);
Category.init(connection);
Answer.init(connection);

//inicializa os relacionamentos
Student.associate(connection.models);
Question.associate(connection.models);
Category.associate(connection.models);
Answer.associate(connection.models);


// for (let assoc of Object.keys(Question.associations)) {
//     for (let accessor of Object.keys(Question.associations[assoc].accessors)) {
//         console.log(Question.name + '.' + Question.associations[assoc].accessors[accessor] + '()');
//     }
// }