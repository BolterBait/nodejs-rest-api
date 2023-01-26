const fs = require("fs/promises");
const path = require("path");

 async function uploadControler(req, res, next) {
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
  uploadControler,
   };