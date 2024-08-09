import multer from 'multer';
import { Readable } from 'stream';
import cloudinary from 'cloudinary';


cloudinary.config({
  cloud_name: 'do4q8il7w',
  api_key: '522195848372837',
  api_secret: 'In46f4kHAgJ5r1MbeR31KmDzhjg',
});


const storage = multer.memoryStorage(); 
const upload = multer({ storage }).single('image'); 

const uploadFileToCloudinary = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const uploadStream = cloudinary.v2.uploader.upload_stream(
    {
      resource_type: 'auto',
      public_id: `imagecart/${Date.now()}`, 
    },
    (error, result) => {
      if (error) {
        return next(error);
      }
      req.fileUrl = result.secure_url;
      req.filePublicId = result.public_id;
      next();
    }
  );

  
  const bufferStream = new Readable();
  bufferStream.push(req.file.buffer);
  bufferStream.push(null); 
  bufferStream.pipe(uploadStream);
};

export { upload, uploadFileToCloudinary };
