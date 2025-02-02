import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const FilePage: React.FC = () => {
  const { fileId } = useParams<{ fileId: string }>();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h2 className="text-2xl font-bold mb-4">File Details</h2>
      <p>File ID: {fileId}</p>
      {/* Add download, share, and delete buttons here */}
    </motion.div>
  );
};

export default FilePage;
