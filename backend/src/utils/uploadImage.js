import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";

const storage = (folderName) => {
  return multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, path.join("uploads", folderName));
    },
    filename: function (_req, file, cb) {
      cb(null, `${uuid()}.${file.mimetype.split("/")[1]}`);
    },
  });
};

export const uploadProfilePicture = multer({
  storage: storage("users"),
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image"))
      return cb(new Error("you can only upload image files"));
    return cb(null, true);
  },
});

export const uploadSpotsImage = multer({
  storage: storage("spots"),
  fileFilter: (_req, file, cb) => {
    if (!file) return cb(new Error("spot image is required"));
    if (!file.mimetype.startsWith("image"))
      return cb(new Error("you can only upload image files"));
    return cb(null, true);
  },
});
