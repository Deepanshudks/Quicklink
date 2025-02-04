import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FileProvider } from './contexts/FileContext';
import FilePage from './pages/FilePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import FileUploadPage from './pages/FileUploadPage';
import { Toaster } from 'react-hot-toast';
import QrCodePage from './pages/QrCodePage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <FileProvider>
       <Toaster/>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/file/:fileId" element={<FilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/upload" element={<FileUploadPage />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/qrcode" element={<QrCodePage />} />
          </Routes>
        </Router>
      </FileProvider>
    </AuthProvider>
  );
};

export default App;
