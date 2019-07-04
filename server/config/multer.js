import multer from 'multer';

const storage = multer.diskStorage({
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(new Error('Only image files are allowed!'), false);
    }
    if (file.size > 230560) {
      cb(new Error('File is too large'), false);
    }
    cb(null, true);
  },

});

const upload = multer({ storage });

export default {
  upload,
};
