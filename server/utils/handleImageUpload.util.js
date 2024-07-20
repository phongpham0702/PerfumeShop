const multer = require("multer");

const uploadImage = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }
})

module.exports = uploadImage