'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.createTable("question_categories", {
            question_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "questions",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "categories",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
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
        queryInterface.dropTable("question_categories");
    }
};