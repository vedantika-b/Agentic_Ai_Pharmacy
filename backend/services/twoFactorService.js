const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Generate 2FA secret for admin
const generate2FASecret = (email) => {
  const secret = speakeasy.generateSecret({
    name: `MedFlow Pharmacy (${email})`,
    length: 32
  });
  
  return {
    secret: secret.base32,
    otpauthUrl: secret.otpauth_url
  };
};

// Generate QR Code for Google Authenticator
const generateQRCode = async (otpauthUrl) => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(otpauthUrl);
    return qrCodeDataURL;
  } catch (error) {
    console.error('QR Code generation error:', error);
    throw new Error('Failed to generate QR code');
  }
};

// Verify 2FA token
const verify2FAToken = (secret, token) => {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    window: 2 // Allow 2 time steps before/after for clock skew
  });
};

module.exports = {
  generate2FASecret,
  generateQRCode,
  verify2FAToken
};
