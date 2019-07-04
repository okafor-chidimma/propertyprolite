const ImageValidator = (req, res, next) => {
  if (req.file !== undefined) {
    const fileName = req.file.originalname.toLowerCase();
    if (!fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
      return res.status(400).json({
        status: 'error',
        error: 'File Must be jpg or jpeg or png or gif',
      });
    }
    if (req.file.size > 10485740) {
      return res.status(400).json({
        status: 'error',
        error: 'File is too large',
      });
    }
  }


  return next();
};

export default ImageValidator;
