const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'chms-demo',
  api_key: process.env.CLOUDINARY_API_KEY || '1234567890',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'secret'
});

const isCloudinaryConfigured = () => {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

module.exports = {
  cloudinary,
  isCloudinaryConfigured
};
