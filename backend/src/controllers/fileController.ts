import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { s3 } from '../routes/fileRoutes';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

const prisma = new PrismaClient();
// const isProduction = process.env.NODE_ENV === 'production';


//Fetch all files 
export const getUserFiles = async (req: Request, res: Response) => {
  // @ts-ignore 
  const userId = req.userId; // Assuming JWT is being used and user ID is embedded in the token

  try {
    // Fetch the files related to the user from the database
    const userFiles = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        files: true, // Fetch the files related to this user
      },
    });

    if (!userFiles) {
      return res.status(404).json({ message: 'User files not found.' });
    }

    res.json({ files: userFiles.files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch user files.' });
  }
};

// File upload handler
export const uploadFile = async (req: Request, res: Response) => {
  console.log("🚀 Into uploads");

  try {
    // Ensure a file is present in the request
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const file = req.file as Express.MulterS3.File; // Ensure correct type for S3 uploads
    console.log("📂 File received:", file);

    //file name 
    const {filename}:any = req
    console.log("FILE NAME :",  filename)

    // Construct the file URL
    const fileURL = file.location; // S3 URL
    console.log("🔗 File URL:", fileURL);

    // Create file entry in database
    console.log("📝 Creating file entry in database...");
    const newFile = await prisma.file.create({
      data: {
        fileName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
        fileURL: fileURL,
        // @ts-ignore
        ownerId: req.userId, // Assuming userId is available from authentication
      },
    });

    console.log("✅ File saved successfully:", newFile);
    res.status(201).json({ file: newFile });
  } catch (error) {
    console.error("❌ Error in uploads:", error);
    res.status(500).json({ message: "File upload failed." });
  }
};


// Get file details and provide download link
export const getFile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const file = await prisma.file.findUnique({
      where: { id: parseInt(id) },
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found.' });
    }

    res.json({ file });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch file.' });
  }
};

// Delete file (only accessible by owner)
export const deleteFile = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("delete's - backend")
  try {
    const file = await prisma.file.findUnique({
      where: { id: parseInt(id) },
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found.' });
    }
    console.log(file.ownerId)
    // @ts-ignore 
    console.log(req.userId)
    // @ts-ignore 
    if (file.ownerId !== req.userId) {
      return res.status(403).json({ message: 'You are not the owner of this file.' });
    }

    // Delete the file from S3
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: file.fileURL.split("/").slice(-2).join("/"), // Extract file path from the file URL
    };
    console.log(deleteParams)

    await s3.send(new DeleteObjectCommand(deleteParams));
    console.log("File deleted from S3");

    await prisma.file.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'File deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete file.' });
  }
};


