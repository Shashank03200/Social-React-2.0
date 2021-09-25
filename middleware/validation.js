const fs = require("fs");

module.exports = (req, res, next) => {
  // first save category name and image
  // valid req.body or req.file willnot get undefined

  if (typeof req.file === "undefined" || typeof req.body === "undefined") {
    return res.status(400).json({
      errors: "Problem with sending data",
    });
  }

  let image = req.file.path;

  // Check type of image we will accept only png jpg jpeg
  if (
    !req.file.mimetype.includes("jpeg") &&
    !req.file.mimetype.includes("png") &&
    !req.file.mimetype.includes("jpg")
  ) {
    // first remove file
    fs.unlinkSync(image);
    return res.status(400).json({
      errors: "file not supported",
    });
  }

  if (req.file.size > 1024 * 1024 * 2) {
    fs.unlinkSync(image);
    return res.status(400).json({
      errors: "File is too large.",
    });
  }

  next();
};
