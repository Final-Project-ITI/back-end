require("dotenv").config();
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require('path')

class MulterMiddleware {
    constructor() { }

    multerOptions() {
        const multerStorage = multer.memoryStorage();

        const multerFilter = (req, file, callBack) => {
            if (file.mimetype.startsWith("image")) {
                callBack(null, true);
            } else {
                callBack(null, false);
            }
        };

        const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

        return upload;
    }

    uploadSingleImage(image) {
        return this.multerOptions().single(image);
    }
    uploadMultipleImages(images) {
        return this.multerOptions().fields(images.map(image => ({ name: image, maxCount: 5 })));
    }
}

module.exports = MulterMiddleware;