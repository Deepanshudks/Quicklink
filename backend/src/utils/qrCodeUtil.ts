import QRCode from "qrcode";

export const generateQrCode = async (fileURL: string) => {
  try {
    const qrCode = await QRCode.toDataURL(fileURL);
    return qrCode;
  } catch (error) {
    throw new Error("Failed to generate QR code.");
  }
};
