import { Request } from 'express';
import path from 'path';
import fs from 'fs';
import prisma from '../model/prismaClient';
import  QRCode from 'qrcode';

// const FILEPATH = "http://localhost:5173/file"

// Service for uploading file

export const saveFileToDatabase = async (req: Request) => {
  const { file } = req;
  if (!file) {
    throw new Error('No file uploaded.');
  }

  const newFile = await prisma.file.create({
    data: {
      fileName: file.originalname,
      fileType: file.mimetype,
      fileSize: file.size,
      fileURL: `/uploads/${file.filename}`,
      // @ts-ignore 
      ownerId: req.userId, // Assuming userId is added by authMiddleware
    },
  });

  return newFile;
};

// Service to fetch file by ID
export const getFileById = async (fileId: number) => {
  const file = await prisma.file.findUnique({
    where: { id: fileId },
  });
  
  if (!file) {
    throw new Error('File not found.');
  }

  return file;
};

// Service for deleting files
export const deleteFileById = async (fileId: number, userId: number) => {
  const file = await prisma.file.findUnique({
    where: { id: fileId },
  });

  if (!file) {
    throw new Error('File not found.');
  }

  if (file.ownerId !== userId) {
    throw new Error('Unauthorized access to delete this file.');
  }

  await prisma.file.delete({
    where: { id: fileId },
  });

  // Optionally delete file from storage (filesystem or cloud)
  const filePath = path.join(__dirname, '..', 'uploads', file.fileURL);
  fs.unlinkSync(filePath);  // Delete file from storage

  return 'File deleted successfully.';
};

export const GenerateQr = async (req: Request, res: Response): Promise<any> => {
  const { fileUrl, FileId } = req.query;
  console.log("************************")
  console.log(fileUrl);
  console.log("************************") 
  
  if (!fileUrl || typeof fileUrl !== "string") {
    // @ts-ignore 
    return res.status(400).json({ message: "File URL is required" });
  }

  console.log("Start generating QR Code");

  try {
    // Generate the QR Code for the given file URL (assuming fileUrl is the path or URL of the file)

    // const EncodedURL = encodeURIComponent(`?url=${fileUrl}`) 
    // console.log(`${APP_URL}/${EncodedURL}`)
    const UrlPath = "?url=" + fileUrl
    const qrCode = await QRCode.toDataURL(`${process.env.FILEPATH}${UrlPath}`);

    // console.log("QR Code generated:", qrCode);

    // Return the QR code as a response
    // @ts-ignore 
    return res.json({ qrCode });
  } catch (error) {
    console.error("Error generating QR code:", error);
    // @ts-ignore 
    return res.status(500).json({ message: "QR Code generation failed", error });
  }
};

export const RenameFile = async (req : Request , res : Response) =>{
  const {id} = req.params;
  const {name} =  req.body;
  try{
    // console.log("start - rename")
    // console.log(name)
  const RenamedFile = await prisma.file.update({
    where : {
      id : Number(id)
    },
    data : {
      fileName : name
    }
  })
  // console.log("start - rename", RenamedFile)
  if(RenamedFile){
    console.log("success")
    // @ts-ignore 
    return res.status(201).json({
      message : "File renamed"
    })
  }else{
    // console.log("exit- error")
    // console.log()
    // @ts-ignore 
    return res.status(401).json({
      message : "Failed to rename file"
    })
  }
}catch(e){
  console.log(e)
  // @ts-ignore 
  res.status(500).json({
    error : e
  })
}
}

// download file 
export const downloadFile = async (req : Request, res : Response ) => {
  const fileId = req.params.id;

  try {
    // Retrieve file information from the database using Prisma
    const file = await prisma.file.findUnique({
      where: { id: parseInt(fileId) },
    });

    if (!file) {
      // @ts-ignore 
      return res.status(404).json({ message: 'File not found' });
    }

    // Construct the file path (assuming files are stored locally in a 'uploads' folder)
    const filePath = path.join(__dirname, 'uploads', file.fileName); // Update according to your storage path

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      // @ts-ignore
      return res.status(404).json({ message: 'File not found on server' });
    }

    // Send the file to the client
    // @ts-ignore
    res.download(filePath, file.fileName, (err) => {
      if (err) {
        // @ts-ignore
        res.status(500).json({ message: 'Error downloading file' });
      }
    });
  } catch (error) {
    console.error(error);
    // @ts-ignore
    res.status(500).json({ message: 'Server error' });
  }
}