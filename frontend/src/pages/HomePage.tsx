import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileContext } from '../contexts/FileContext';
import FileCard from '../components/FileCard';

const HomePage: React.FC = () => {
  const { files, fetchFiles } = useContext(FileContext);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h2 className="text-2xl font-bold mb-4">Your Files</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {files.map((file) => (
          <FileCard key={file.url} fileName={file.name} fileUrl={file.url} onDownload={() => {}} />
        ))}
      </div>
    </motion.div>
  );
};

export default HomePage;
