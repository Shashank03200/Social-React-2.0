const multer = require("multer");
const path = require("path");

function checkFileTypes(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;

  // Check file size
  if (file.filesize > 1000000) {
    return cb("Error: File too large");
  }

  //Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb("Error: Images only");
  }
}

//Create the storage

// const storageFunction = multer.diskStorage({
//   destination: (req, file, callback) => {
//     console.log("File", file);
//     callback(null, "./client/public/assets/uploads/posts");
//   },
//   filename: (req, file, callback) => {
//     const currentFileName =
//       Date.now() + "_" + file.originalname.split(" ").join("-");
//     callback(null, currentFileName);
//   },
// });

// module.exports = multer({
//   storage: storageFunction,
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname.toLowerCase());
//     console.log(ext);
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error("File type is not supported"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1000000,
  },
  fileFilter: function (req, file, cb) {
    checkFileTypes(file, cb);
  },
});

module.exports = upload;
