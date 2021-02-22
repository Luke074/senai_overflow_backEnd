require("dotenv").config();

module.exports = {
    url: process.env.DATABASE_URL,
    config: {
        dialect: "mysql",
        define: {
            timestamp: true,
            underscored: true
        },
    },
};