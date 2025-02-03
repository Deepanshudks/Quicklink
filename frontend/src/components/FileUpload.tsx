import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {  FileText, UploadCloud, XCircle } from 'lucide-react';
import { uploadFile } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface FileUploadProps {
  onUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFileData, setUploadedFileData] = useState<any>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    onUpload(selectedFile); // Pass the file to the parent component
    generateFilePreview(selectedFile); // Generate the preview
  };

  // Generate file preview
  const generateFilePreview = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file); // Generate the preview
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return; // Early return if no file is selected

    setLoading(true);
    setError(null);

    try {
      console.log("FIles ",file)
      const data = await uploadFile(file); // Call the API function from api.ts
      setUploadedFileData(data); 
      navigate("/dashboard")
      // Set the response with file metadata
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to upload file. Please try again.");
    }
  };

  // Cancel file selection by clicking the cross icon
  const handleCancel = () => {
    setFile(null); // Reset file state
    setFilePreview(null); // Reset file preview state
    setUploadedFileData(null); // Reset uploaded file data
    setError(null); // Reset error state
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <motion.div
        className={`w-full p-6 border-2 ${
          dragging ? "border-teal-500 bg-teal-100" : "border-gray-300"
        } border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all`}
        onDragOver={handleDragOver}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <UploadCloud size={48} className="text-teal-500 mb-4" />
        <p className="text-lg text-gray-700">Drag & drop or click to upload</p>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="mt-3 text-teal-600 cursor-pointer text-sm">
          Choose a file
        </label>
      </motion.div>

      {file && filePreview && (
        <motion.div
          className="mt-6 p-4 bg-white border rounded-lg shadow-sm relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center">
            {file.type.startsWith("image/") ? (
              <img
                src={filePreview}
                alt="File preview"
                className="max-w-9/10 max-h-48 object-contain rounded-lg"
              />
            ) : (
              <div className="flex items-center gap-3">
                <FileText size={32} className="text-teal-500" />
                <span className="font-medium text-gray-700">{file.name}</span>
              </div>
            )}
          </div>

          {/* Cross Icon for Cancel */}
          <div
            className="absolute top-2 right-2 text-red-500 cursor-pointer"
            onClick={handleCancel}
          >
            <XCircle size={24} />
          </div>
        </motion.div>
      )}

      {/* Upload Button */}
      {file && !loading && !uploadedFileData && (
        <motion.button
          className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700"
          onClick={handleUpload}
        >
          Upload File
        </motion.button>
      )}

      {/* Loading State */}
      {loading && (
        <motion.div
          className="mt-6 p-4 bg-blue-50 border rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-teal-600">Uploading...</p>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          className="mt-6 p-4 bg-red-50 border rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-red-600">{error}</p>
        </motion.div>
      )}

      {/* Uploaded File Data */}
      {uploadedFileData && !loading && (
        <motion.div
          className="mt-6 w-full p-4 bg-gray-50 border rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <FileText size={32} className="text-teal-500" />
            <div className="flex flex-col">
              <span className="font-medium text-gray-700">{uploadedFileData.fileName}</span>
              <span className="text-xs text-gray-500">
                {(uploadedFileData.fileSize / 1024).toFixed(2)} KB
              </span>
              <a
                href={uploadedFileData.fileURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 text-sm mt-2"
              >
                View File
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;
