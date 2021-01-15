'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.createTable("perguntas", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: Sequelize.STRING,
                allowNull: false
            },
            descricao: {
                type: Sequelize.STRING,
                allowNull: false
            },
            imagem: {
                type: Sequelize.STRING,
                allowNull: true
            },
            gist: {
                type: Sequelize.STRING,
                allowNull: true
            },
            aluno_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "alunos",
                    key: "id"
                }
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            }
        });
    },

    down: async(queryInterface, Sequelize) => {
        queryInterface.dropTable("perguntas");
    }
};