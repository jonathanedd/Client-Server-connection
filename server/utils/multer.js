const multer = require('multer');

// multer.diskStorage();   This option to save Imgs is not recommended, it allows to save Imgs in the server.

const storage = multer.memoryStorage(); // Method to save Imgs on cloud, More recommended

const upload = multer({ storage }); //Instance of multer     : {}, fileFilter: () => {} }

module.exports = { upload };
