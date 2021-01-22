const Multer = require("multer");

const uploadQuestions = Multer({
    storage: Multer.diskStorage({
        destination: "uploads/",
        filename: (req, file, callback) => {
            const filename = Date.now() + "." + file.originalname.split(".").pop();

            return callback(null, filename);
        }
    }),
    fileFilter: (req, file, callback) => {
        let allowedTypes = ["image/png", "image/jpeg"];

        if (allowedTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error("Tipo do arquivo inválido"));
        }


    },
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
});

module.exports = uploadQuestions.single("image");