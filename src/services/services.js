var admin = require("firebase-admin");

const Multer = require("multer");

var serviceAccount = require("../config/firebase.json");

const BUCKET = "gs://senai-overflow-2021.appspot.com";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET
});

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {

    if (!req.file)
        return next();

    const imagem = req.file;
    const nomeArquivo = Date.now() + "." + file.originalname.split(".").pop();

    const file = bucket.file(nomeArquivo);

    const stream = file.createWriteStream({
        metadata: {
            contentType: imagem.mimetype,
        },
    });


    stream.on("error", (e) => {
        console.error(e);
    });

    stream.on("finish", async() => {
        //tornar o arquivo publico
        await file.makePublic();

        //e tornar a url publica
        req.file.firebaseUrl = `https://storage.googleapis/${BUCKET}/${nomeArquivo}`
    });

    stream.end(imagem.buffer);

};

module.exports = uploadImage;