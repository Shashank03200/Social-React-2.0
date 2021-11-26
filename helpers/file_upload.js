const multer = require("multer");
const fs = require("fs");
const path = require("path");

let sampleImages = [];

function checkFileTypes(file, cb){

  // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;

    // Check file size 
    if(file.filesize > 1000000){
        return cb('Error: File too large')
    }

    //Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    
    if( extname && mimetype){
      return cb(null, true);
    }else{
      return cb('Error: Images only');
    }

}

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

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: function(req, file, cb){
    checkFileTypes(file, cb);
  }
});

module.exports = upload;
