import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { deleteFile } from "../services/api";

// @ts-ignore 
const FileActions: React.FC<FileActionsProps> = ({setIsModalOpen,fetchFiles, id, setComponentId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRenameClick = async () => {
    await setComponentId(id)
    // console.log(id)
    setIsModalOpen(true)
    setIsOpen(false); // Close the menu after selection
  }

  // Toggle the dropdown menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Button to open the menu */}
      <button
        className="p-2 hover:bg-teal-50 rounded-full"
        onClick={toggleMenu}
      >
        <MoreVertical className="h-4 w-4 text-teal-500" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md">
          <button
            className="w-full text-left px-3 py-2 hover:bg-gray-100"
            onClick={handleRenameClick}
          >
            Rename
          </button>
          <button
            className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-100"
            onClick={async () => {
              // console.log("Delete clicked");
              await deleteFile(id)
              await fetchFiles()
              setIsOpen(false);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FileActions;
