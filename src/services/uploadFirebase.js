const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase.json");

const Multer = require("multer");

const BUCKET = "senai-overflow-2021.appspot.com";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET
});

const bucket = admin.storage().bucket();

const uploadFirebase = (req, res, next) => {

    if (!req.file)
        return next();

    const image = req.file;
    const filename = Date.now() + "." + image.originalname.split(".").pop();

    const file = bucket.file(filename);

    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype,
        },
    });


    stream.on("error", (error) => {
        console.error(error);

        res.status(500).send({ error: "Erro ao subir para o fire base" });
    });

    stream.on("finish", () => {
        //tornar o arquivo publico
        file.makePublic();

        req.file.filename = filename;

        //e tornar a url publica
        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${filename}`;

        next();
    });

    stream.end(image.buffer);

};

module.exports = uploadFirebase;