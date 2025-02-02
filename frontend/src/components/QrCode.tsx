import React from 'react';

interface QrCodeProps {
  qrCode: string;
  downloadQRCode: () => void;
}

const QrCode: React.FC<QrCodeProps> = ({ qrCode, downloadQRCode }) => {
  return (
    <div className="mt-6 text-center">
      <p className="text-lg font-medium text-teal-600 mb-4">Scan QR Code to Access File:</p>
      <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto rounded-lg shadow-2xl" />
      
      {/* Download Button */}
      <div className="mt-6">
        <button
          onClick={downloadQRCode}
          className="bg-teal-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-teal-400 transition duration-300 ease-in-out"
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
};

export default QrCode;
