const jwt = require("jsonwebtoken");
const auth = require("../config/auth.json");

module.exports = (req, res, next) => {
    //pegando o campo autorizacao do cabeçalho da requisição
    const { authorization } = req.headers;

    //verifica se o campo foi informado, se nao retorna erro
    if (!authorization)
        return res.status(404).send({ error: "Token nao informado" });

    //separa o prefixo token
    const [Bearer, token] = authorization.split(" ");

    //verifica se o token esta presente, se nao retorna erro
    if (!token)
        return res.status(401).send({ error: "Token mal formatado" });

    try {
        //verifica se o token é valido, se nao cai no catch
        const payload = jwt.verify(token, auth.secret);

        //coloca o id do aluno na requisição
        req.studentId = payload.studentId;

        //envia a requisicao para frente (controller)
        return next();

    } catch (error) {
        //retorna erro do token invalido
        res.status(401).send({ error: "Token Invalido" });
    }
}