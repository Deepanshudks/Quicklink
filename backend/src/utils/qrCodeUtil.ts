import QRCode from 'qrcode';

// Function to generate a QR code for a file download link
export const generateQrCode = async (fileURL: string) => {
  try {
    const qrCode = await QRCode.toDataURL(fileURL);
    return qrCode;
  } catch (error) {
    throw new Error('Failed to generate QR code.');
  }
};
