import React, { createContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface FileContextProps {
  files: Array<{ name: string; url: string }>;
  uploadFile: (file: File) => Promise<void>;
  fetchFiles: () => Promise<void>;
}

export const FileContext = createContext<FileContextProps>({
  files: [],
  uploadFile: async () => {},
  fetchFiles: async () => {},
});

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<Array<{ name: string; url: string }>>([]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('/api/files');
      setFiles(response.data.files);
    } catch (error) {
      // console.error(error);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchFiles();
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <FileContext.Provider value={{ files, uploadFile, fetchFiles }}>
      {children}
    </FileContext.Provider>
  );
};
