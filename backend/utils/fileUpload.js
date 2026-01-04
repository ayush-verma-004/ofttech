const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

console.log('Initializing Cloudinary Storage with cloud_name:', cloudinary.config().cloud_name ? '***' + cloudinary.config().cloud_name.slice(-4) : 'MISSING');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ofttech-media',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        public_id: (req, file) => {
            // Remove extension from original name as Cloudinary adds it
            const name = file.originalname.split('.')[0];
            return `team_${name}_${Date.now()}`;
        }
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
