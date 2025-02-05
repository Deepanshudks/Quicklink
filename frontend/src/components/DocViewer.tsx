import React from "react";

interface DocViewerProps {
  fileUrl: string; // Pass the S3 URL of the .docx file
}

const DocViewer: React.FC<DocViewerProps> = ({ fileUrl }) => {
  const officeViewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <iframe
        src={officeViewerUrl}
        title="Document Viewer"
        className="w-full h-full border-none"
      ></iframe>
    </div>
  );
};

export default DocViewer;
