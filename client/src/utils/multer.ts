import multer from "multer";
import fs from "fs";
import util from "util";

const unlinkFile = util.promisify(fs.unlink);

const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});

const fileFilterImageOnly = (req: any, file: any, cb: any) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "File type not allowed. Allowed file types are: jpg, jpeg, webp, png."
      ),
      false
    );
  }
};

const removeFile = async (filePath: string) => {
  try {
    await unlinkFile(filePath);
    console.log(`File '${filePath}' successfully deleted`);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

const uploadImage = multer({
  storage,
  fileFilter: fileFilterImageOnly,
  limits: { fileSize: 3000000 }, 
});

export { removeFile, uploadImage };
