const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

console.log('Initializing Cloudinary Storage with cloud_name:', cloudinary.config().cloud_name ? '***' + cloudinary.config().cloud_name.slice(-4) : 'MISSING');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ofttech_media',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
