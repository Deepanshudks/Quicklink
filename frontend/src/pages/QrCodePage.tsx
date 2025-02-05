import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QrCode from '../components/QrCode';
import { useLocation, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL; // Adjust API URL as needed


const QrCodePage: React.FC = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation()
  const { fileURL, FileId } = location.state || {};

  const history = useNavigate(); // Initialize history

  // Function to fetch the QR code
  const GetQRCode = async (url: string, FileId : string) => {
    setLoading(true);
    setError(null);
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get<{ qrCode: string }>(
        `${API_URL}/files/generateQR`,
        {
          params: { fileUrl: url,FileId : FileId },
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      setQrCode(response.data.qrCode);
    } catch (err) {
      setError('Failed to generate QR Code');
      // console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // @ts-ignore 
  const handleclick = async () => {
    setLoading(true);
    setError(null);
    try {
      await GetQRCode(fileURL,FileId);
    } catch (e) {
      setError('Failed to generate QR Code');
    }
  };

  // Fetch the QR code when the component mounts
  useEffect(() => {
    if (fileURL) {
      GetQRCode(fileURL,FileId);
    }
  }, [fileURL]);

  // Function to download QR code image
  const downloadQRCode = () => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qr-code.png'; // Change file extension as required (e.g., '.jpeg')
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-teal-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 ease-in-out hover:scale-105">
        <h2 className="text-3xl font-semibold text-center mb-6 text-teal-600">File QR Code</h2>

        {/* Back Button */}
        <button
          onClick={() => history("/dashboard")} // Go back to the previous page
          className="absolute hover:text-teal-700 cursor-pointer top-4 left-4 text-teal-600 font-semibold"
        >
          &#8592; Back
        </button>

        {/* Loading Indicator */}
        {loading && <div className="text-center text-teal-500">Generating QR Code...</div>}

        {/* Error Message */}
        {error && <div className="text-center text-red-500">{error}</div>}

        {/* QR Code Display */}
        {qrCode && (
          <QrCode qrCode={qrCode} downloadQRCode={downloadQRCode} />
        )}

      </div>
    </div>
  );
};

export default QrCodePage;
