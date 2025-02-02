import { LogOut, Menu, Search, Upload } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const Navbar = ({ searchQuery, setSearchQuery }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {/* QuickLink App Name */}
            <div className="text-lg font-semibold text-teal-600">QuickLink</div>
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

          {/* Hamburger Menu Icon */}
          <div className="ml-4 flex items-center gap-4 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-6 w-6 text-teal-600" />
            </button>
          </div>

          {/* Desktop Menu (hidden on mobile) */}
          <div className="ml-4 flex items-center gap-4 hidden lg:flex">
            <Link to={"/upload"}>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-teal-400 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </button>
            </Link>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (shown when isMobileMenuOpen is true) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg p-4">
          <div className="space-y-4">
            <Link to={"/upload"} className="block text-teal-600 font-medium">
              <Upload className="h-4 w-4 inline mr-2" />
              Upload Files
            </Link>
            <button
              onClick={handleLogout}
              className="block text-red-500 font-medium"
            >
              <LogOut className="h-4 w-4 inline mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
