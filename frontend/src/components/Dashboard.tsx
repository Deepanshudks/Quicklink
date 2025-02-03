import { useState, useEffect,  } from "react";
import {
  Files,
  FileText,
  Image,
  Video,
  Music,
  File,
  QrCode,
} from "lucide-react";
import { getUserFiles, RenameFile } from "../services/api";
import { useNavigate } from "react-router-dom";
import FileActions from "./FileActions";
import { Navbar } from "./Navbar";

export interface FileData {
  id: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileURL: string;
  ownerId: number;
  createdAt: string;
}

const Dashboard = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [id, setComponentId] = useState(Number);
  const navigate = useNavigate()

  const handleRename = async () => {
    if (newName.trim()) {
      // console.log(newName)
      // console.log(id)
     await RenameFile(id, newName); // Pass the new name to RenameFile
      setIsModalOpen(false);
      setNewName("") // Close the modal after renaming
    }
  };

  // const handleQRClick = async () => {

  // }

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const filesData = await getUserFiles();
      setFiles(filesData);
      setLoading(false);
    } catch (error) {
      setError("Failed to load files");
      setLoading(false);
    }
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

  const getFileCategory = (fileType: string) => {
    const type = fileType.toLowerCase();
    if (type.includes('image')) return 'Images';
    if (type.includes('video')) return 'Videos';
    if (type.includes('audio')) return 'Audio';
    if (type.includes('pdf') || type.includes('doc') || type.includes('docx')) return 'Documents';
    return 'Others';
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

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || getFileCategory(file.fileType).toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-1 flex items-center">
              <div className="relative flex-1 max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search files..."
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="ml-4 flex items-center gap-4">
              <Link to={"/upload"}>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-teal-400 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </button>
              </Link>

            </div>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${activeFilter === 'all'
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <Files className="h-5 w-5 mr-3" />
                All Files ({files.length})
              </button>
              <button
                onClick={() => setActiveFilter('documents')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${activeFilter === 'documents'
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <FileText className="h-5 w-5 mr-3" />
                Documents
              </button>
              <button
                onClick={() => setActiveFilter('images')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${activeFilter === 'images'
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <Image className="h-5 w-5 mr-3" />
                Images
              </button>
              <button
                onClick={() => setActiveFilter('videos')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${activeFilter === 'videos'
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <Video className="h-5 w-5 mr-3" />
                Videos
              </button>
            </nav>

            {/* Storage Info */}
            <div className="mt-8 bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="text-sm font-medium text-slate-700 mb-4">Storage</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Used Space</span>
                    <span className="text-slate-600">
                      {formatFileSize(files.reduce((acc, file) => acc + file.fileSize, 0))}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal for renaming  */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full transform transition-all duration-300 scale-95 hover:scale-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Rename File</h2>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)} // Update new name as user types
                  placeholder="Enter new name"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-6 py-2 bg-gray-100 text-gray-600 font-medium rounded-lg transition-all duration-300 hover:bg-gray-200"
                    onClick={() => setIsModalOpen(false)} // Close modal without renaming
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-2 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-medium rounded-lg transition-all duration-300 hover:from-teal-500 hover:to-teal-600"
                    onClick={handleRename} // Submit the new name to RenameFile
                  >
                    Rename
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* {/* Main Content */}

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
                        <div onClick={()=>{
                          navigate(`${file.fileURL}`)
                        }} className="text-teal-500">
                          {file.fileName ? (
                            // Check if the file type is an image
                            file.fileType.startsWith("image/") ? (
                              <div className="w-10 h-10">
                                <img src={`${file.fileURL}`} alt={`${file.fileType}`} />
                              </div>
                            ) : (
                              getFileIcon(file.fileType) // Display the icon for non-image files
                            )
                          ) : (
                            getFileIcon(file.fileType) // If there's no fileName, show the icon
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{file.fileName.toString().slice(0,15)}</p>
                          <p className="text-xs text-slate-500">
                            {formatFileSize(file.fileSize)} • {formatDate(file.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* <a
                          href={`API_URL/api/files/download/${file.id}`}
                          className="p-2 hover:bg-teal-50 rounded-full"
                          target="_blank" ping=""
                          download={"File"}
                          rel="noopener noreferrer"
                        >
                          <Download className="h-4 w-4 text-teal-500" />
                        </a> */}
                        <button onClick={() => {
                          navigate("/QrCode", {
                            state: { fileURL: file.fileURL }
                          })
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
          {/* <FileContent files={files} /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;