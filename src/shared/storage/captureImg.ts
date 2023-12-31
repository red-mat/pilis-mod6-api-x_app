import multer from "multer";

export default function captureImg(fieldName: string) {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith("image/")) {
        return cb(null, false);
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        return cb(null, false);
      }

      cb(null, true);
    },
  });

  return upload.single(fieldName);
}
