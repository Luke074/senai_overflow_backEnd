const auth = require("./config/auth.json");
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
    return jwt.sign(
        payload,
        auth.secret, {
            expiresIn: "1h",
        });

}

module.exports = { generateToken };