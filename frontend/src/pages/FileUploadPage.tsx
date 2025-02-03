import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText,ArrowLeft, Image, UploadCloud } from "lucide-react";
import FileUpload from "../components/FileUpload";
import { useNavigate } from "react-router-dom";

const FileUploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleUpload = async (uploadedFile: File) => {
    setLoading(true);
    // Simulate file upload (replace with actual API logic)
    setTimeout(() => {
      setFile(uploadedFile);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-100 to-white p-6">
      <motion.div
        className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        >
          <div onClick={()=>{
            navigate("/dashboard")
          }} className="flex bg-zinc-200 hover:bg-zinc-300 p-2 rounded-full px-4 w-fit items-center">
          <ArrowLeft size={18}/> 
        <button className="text-lg font-nomal  px-1">Back</button>
          </div>
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Upload Your Files
        </h1>

        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <FileUpload onUpload={handleUpload} />
        </motion.div>

        {/* File Preview */}
        {file && !loading && (
          <motion.div
            className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4">
              {file.type.startsWith("image/") ? (
                <Image size={40} className="text-teal-500" />
              ) : (
                <FileText size={40} className="text-indigo-500" />
              )}
              <div className="flex flex-col">
                <h3 className="font-medium text-gray-700">{file.name}</h3>
                <span className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            className="mt-6 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <UploadCloud className="animate-spin text-teal-500" size={48} />
            <span className="ml-2 text-lg text-gray-600">Uploading...</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default FileUploadPage;
