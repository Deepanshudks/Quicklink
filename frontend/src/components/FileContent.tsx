import { useState } from "react";
import { File, FileText, Image, LinkIcon, Music, QrCode, Share2, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FileData } from "./Dashboard";

export const FileContent  = ({files}: any) =>{
      const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");
        const [activeFilter, setActiveFilter] = useState("all");
        const [searchQuery, setSearchQuery] = useState("");
          const navigate = useNavigate()
        

        const filteredFiles = files.filter(file => {
            const matchesSearch = file.fileName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = activeFilter === "all" || getFileCategory(file.fileType).toLowerCase() === activeFilter.toLowerCase();
            return matchesSearch && matchesFilter;
          });
          
          const getFileCategory = (fileType: string) => {
            const type = fileType.toLowerCase();
            if (type.includes('image')) return 'Images';
            if (type.includes('video')) return 'Videos';
            if (type.includes('audio')) return 'Audio';
            if (type.includes('pdf') || type.includes('doc') || type.includes('docx')) return 'Documents';
            return 'Others';
          };

          const getFileIcon = (fileType: string) => {
            const type = fileType.toLowerCase();
            if (type.includes('image')) return <Image className="h-10 w-10" />;
            if (type.includes('video')) return <Video className="h-10 w-10" />;
            if (type.includes('audio')) return <Music className="h-10 w-10" />;
            if (type.includes('pdf')) return <FileText className="h-10 w-10" />;
            if (type.includes('doc') || type.includes('docx')) return <FileText className="h-10 w-10" />;
            return <File className="h-10 w-10" />;
          };

          const formatFileSize = (bytes: number) => {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
          };
        
          const formatDate = (dateString: string) => {
            return new Date(dateString).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
          };
    
    return(
        <div className="col-span-12 lg:col-span-9">
            <div className="bg-white rounded-lg border border-slate-200">
              <div className="p-4 border-b border-slate-200">
                <h2 className="text-lg font-medium text-slate-900">Your Files</h2>
              </div>

              {loading ? (
                <div className="p-8 text-center text-slate-500">Loading files...</div>
              ) : error ? (
                <div className="p-8 text-center text-red-500">{error}</div>
              ) : filteredFiles.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  {searchQuery ? "No files match your search" : "No files uploaded yet"}
                </div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {filteredFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 hover:bg-slate-50">
                      <div className="flex items-center space-x-4">
                        <div className="text-teal-500">
                          {getFileIcon(file.fileType)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{file.fileName}</p>
                          <p className="text-xs text-slate-500">
                            {formatFileSize(file.fileSize)} • {formatDate(file.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-teal-50 rounded-full">
                          <Share2 className="h-4 w-4 text-teal-500" />
                        </button>
                        {/* <a
                          href={`API_URL/api/files/download/${file.id}`}
                          className="p-2 hover:bg-teal-50 rounded-full"
                          target="_blank" ping=""
                          download={"File"}
                          rel="noopener noreferrer"
                        >
                          <Download className="h-4 w-4 text-teal-500" />
                        </a> */}
                        <button className="p-2 hover:bg-teal-50 rounded-full">
                          <LinkIcon className="h-4 w-4 text-teal-500" />
                        </button>
                        <button onClick={()=>{
                          navigate("/QrCode")
                        }} className="p-2 hover:bg-teal-50 rounded-full">
                          <QrCode className="h-4 w-4 text-teal-500" />
                        </button>
                        {/* @ts-ignore  */}
                        <FileActions setIsModalOpen={setIsModalOpen} setComponentId={setComponentId} id={file.id} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
    )
}