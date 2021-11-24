const multer = require("multer");
const fs = require("fs");

let sampleImages = [];

const imageFilter = (req, file, cb) => {
  if(file.fileSize > 1000000){
    cb(null, false);
  }else{
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
};

//Create the storage

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log("File", file);
    callback(null, "./client/public/assets/uploads/posts");
  },
  filename: (req, file, callback) => {
    const currentFileName =
      Date.now() + "_" + file.originalname.split(" ").join("-");
    sampleImages.push(currentFileName);

    if (sampleImages.length > 1) {
      fs.unlinkSync(
        "./client/public/assets/uploads/posts/" + sampleImages.shift(),
        (err) => {
          if (err) console.log(err);
          else console.log("Deleted file");
        }
      );
    }
    callback(null, currentFileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
