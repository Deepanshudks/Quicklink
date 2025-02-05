import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FileViewer from '../components/FileViewer';

const ViewFile = () => {
  const location = useLocation(); // Get the current location object
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract URL parameter from location.search (query string)
    const params = new URLSearchParams(location.search);
    const encodedFileUrl = params.get('url');

    if (encodedFileUrl) {
      const decodedFileUrl = decodeURIComponent(encodedFileUrl); // Decode the URL
      setFileUrl(decodedFileUrl); // Set the decoded file URL

      // Determine the file type based on the extension
      const extension = decodedFileUrl.split(".").pop()?.toLowerCase();
      if (extension) {
        setFileType(extension);
        setLoading(false);
      }
    }
  }, [location]);

  return <FileViewer fileUrl={fileUrl} fileType={fileType} loading={loading} />;
};

export default ViewFile;
