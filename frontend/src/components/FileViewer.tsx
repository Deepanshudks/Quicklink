import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Mammoth from "mammoth";
import { useLocation } from "react-router-dom";

interface FileViewerProp  {
  loading:boolean,
  fileUrl : string ,
  fileType : string
}

const FileViewer = ({loading,fileUrl,fileType}:FileViewerProp) => {
  const location = useLocation(); // Get the current location object
  const [docContent, setDocContent] = useState("");

  // Detect File URL from location.pathname or location.search
  // useEffect(() => {
  //   const fileUrlFromPath =  location.pathname.split("/file/")[1]; // Get the file URL from the path
  //   const decodedFileUrl = fileUrlFromPath ? decodeURIComponent(fileUrlFromPath) : "";
  //   // setFileUrl(decodedFileUrl); // Set the decoded file URL

  //   if (decodedFileUrl) {
  //     const extension = decodedFileUrl.split(".").pop()?.toLowerCase(); // Get file extension
  //     if (extension) {
  //       setFileType(extension);
  //       setLoading(false);
  //     }
  //   }
  // }, [location]);

  // Convert DOCX to HTML using Mammoth.js
  useEffect(() => {
    if (fileUrl && ["doc", "docx"].includes(fileType)) {
      fetch(fileUrl)
        .then((response) => response.arrayBuffer())
        .then((buffer) => Mammoth.convertToHtml({ arrayBuffer: buffer }))
        .then((result) => setDocContent(result.value))
        .catch(() => setDocContent("<p class='text-red-500'>Error loading document</p>"));
    }
  }, [fileUrl, fileType]);

  const renderFile = () => {
    if (!fileUrl) return <p className="text-red-500 text-center">No file provided</p>;

    if (loading) {
      return <Loader2 className="animate-spin text-teal-600 mx-auto" size={32} />;
    }

    // PDF viewer
    if (fileType === "pdf") {
      return (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js`}>
          <Viewer fileUrl={fileUrl} />
        </Worker>
      );
    }

    // Image viewer
    if (["png", "jpg", "jpeg", "gif", "webp"].includes(fileType)) {
      return <img src={fileUrl} alt="Uploaded File" className="w-full h-full object-contain" />;
    }

    // DOCX viewer
    if (["doc", "docx"].includes(fileType)) {
      return (
        <div
          className="w-full h-full p-4 overflow-auto bg-white shadow-lg"
          dangerouslySetInnerHTML={{ __html: docContent }}
        />
      );
    }

    // If file type is unsupported, provide a download link
    return (
      <p className="text-gray-600 text-center">
        File type not supported for preview.{" "}
        <a href={fileUrl} download className="text-blue-600 underline">
          Download File
        </a>
      </p>
    );
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50">
      <h2 className="text-2xl font-semibold text-teal-700 text-center p-4 bg-white shadow-md">File Viewer</h2>
      <div className="flex-1 flex justify-center items-center p-4 overflow-auto">{renderFile()}</div>
    </div>
  );
};

export default FileViewer;
