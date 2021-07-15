const fs = require('fs');


module.exports = (req, res, next) => {
    // save name and image
    // valid req.body or req.file will not get undefined
    if (typeof (req.file) === undefined || typeof (req.body) === undefined) {
        //error
        return res.status(400).json({
            error: "Problem with sending data"
        })
    }

    //get image and file name
    console.log(req.file)
    let image = req.body.path
    console.log(image)
    // Check type of image we will accept png || jpg|| jpeg
    if (
        !(req.file.mimetype).includes('jpeg') &&
        !(req.file.mimetype).includes('jpg') &&
        !(req.file.mimetype).includes('png')
    ) {
        // first remove file
        fs.unlinkSync(image)
        return res.status(400).json({
            error: "File not supported"
        })
    }

    next();
}