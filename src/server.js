const app = require("./app");

//porta HTTP
const PORT = 3333;

//subindo o servidor na web
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});