import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { uploadFile, getFile, deleteFile, getUserFiles } from '../controllers/fileController';
import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { downloadFile, GenerateQr, RenameFile } from '../services/fileService';

// const isProduction = process.env.NODE_ENV === 'production';
 
dotenv.config()

const Filename = uuidv4()
// console.log(name)

// AWS S3 Configuration (Only in Production)
export const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// console.log({
//   region: process.env.AWS_REGION!,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// })
const s3Storage = multerS3({
  s3: s3,
  bucket: function (req, file, cb) {
    const bucketName = process.env.AWS_BUCKET_NAME!;
    cb(null, bucketName);
  },
  metadata: (req, file, cb) => {
    try {
      if (!file) throw new Error("File object is undefined in metadata");

      // console.log("🚀 Processing metadata...");
      // console.log("File Name:", file.originalname);
      // console.log("File Size:", file.size || "Unknown"); // Prevents crashes
      // console.log("File Type:", file.mimetype || "Unknown");

      cb(null, { fieldName: file.fieldname });
      // console.log("✅ Metadata processing complete.");
    } catch (error) {
      // console.error("❌ Error in metadata function:", error);
      cb(error);
    }
  },
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    try {
      if (!file) throw new Error("File object is undefined in key");

      // console.log("🚀 Generating file key...");
      const filename = `uploads/${Date.now()}_${Filename}`;
      // console.log("Generated Key:", filename);

      cb(null, filename);
    } catch (error) {
      // console.error("❌ Error in key function:", error);
      cb(error);
    }
  },
});


// // Set up file storage for local host

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(process.cwd(), "uploads");
//     if(!fs.existsSync(uploadPath)){
//       fs.mkdirSync(uploadPath,{recursive:true})
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const fileExt = path.extname(file.originalname);
//     cb(null, `${Date.now().toString()}${fileExt}`);
//   },
// });

const upload = multer({
  //  storage : isProduction? s3Storage : storage,
   storage : s3Storage,
   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  });



const router = Router();

const multerMiddleware= (req: any,res:any,next:any)=>{
  upload.single('file')(req, res, function (err) {
    console.log("HIII")
    if (err) {
      return res.status(400).json({ error: "File upload failed", details: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    req.filename = Filename;
    next()
  });
}


// Routes
router.get("/",authenticate as any,getUserFiles)
router.post('/uploads', authenticate as any, multerMiddleware, uploadFile as any);
// router.post('/uploads', authenticate as any, upload.single('file')(req,res,function), uploadFile as any);
// @ts-ignore 
router.get("/generateQR",authenticate as any,GenerateQr)
// @ts-ignore 
router.put("/rename/:id",authenticate,RenameFile)
// router.get('/:id', getFile as any);
router.delete('/:id',authenticate, deleteFile as any);
router.get('/download/:id', downloadFile as any);

export default router;
