const multer = require('multer');
const path = require("path");
const fs = require("fs/promises");

// async function upload(req, res, next) {
    
//         res.status(201).json({ status: 'success' });
  
// }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, "tmp"));
    },
    filename: function (req, file, cb) {
      cb(null, Math.random() + file.originalname);
    },
  });
  
 async function upload(req, res, next) {
    console.log("file", req.file);
    const { filename } = req.file;
  
    try {
      const tmpPath = path.resolve(__dirname, "tmp", filename);
      const newPath = path.resolve(__dirname, "public", filename);
      await fs.rename(tmpPath, newPath);
      return res.json({
        ok: true,
      });
    } catch (error) {
      console.error("error while moving file to public", error);
      return res.status(500).json({
        message: "Internal ser ver error",
      });
    }
  }

module.exports = {
    upload, storage
   };