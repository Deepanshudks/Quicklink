import React from 'react';
import { motion } from 'framer-motion';

interface FileCardProps {
  fileName: string;
  fileUrl: string;
  onDownload: () => void;
}

const FileCard: React.FC<FileCardProps> = ({ fileName, fileUrl, onDownload }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 rounded shadow-md w-80 mb-4"
    >
      <h3 className="text-lg font-bold">{fileName}</h3>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="mt-2 bg-green-500 text-white p-2 rounded"
        onClick={onDownload}
      >
        Download
      </motion.button>
    </motion.div>
  );
};

export default FileCard;
