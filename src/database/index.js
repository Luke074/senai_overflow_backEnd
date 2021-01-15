const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//imports dos Models
const Student = require("../Models/Student");
const Question = require("../Models/Question");
const Category = require("../Models/Category");
const Answer = require("../Models/Answer");
const conexao = new Sequelize(dbConfig);

//Inicializa os Models
Student.init(conexao);
Question.init(conexao);
Category.init(conexao);
Answer.init(conexao);

//inicializa os relacionamentos
Student.associate(conexao.models);
Question.associate(conexao.models);
Category.associate(conexao.models);
Answer.associate(conexao.models);


// for (let assoc of Object.keys(Question.associations)) {
//     for (let accessor of Object.keys(Question.associations[assoc].accessors)) {
//         console.log(Question.name + '.' + Question.associations[assoc].accessors[accessor] + '()');
//     }
// }