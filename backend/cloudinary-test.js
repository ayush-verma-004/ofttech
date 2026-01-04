require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

console.log('Testing Cloudinary Connection...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing');

cloudinary.api.ping((error, result) => {
    if (error) {
        console.error('Ping Failed:', error);
    } else {
        console.log('Ping Successful:', result);

        // Attempt upload
        console.log('Attempting sample upload...');
        cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
            { public_id: "olympic_flag" },
            function (error, result) {
                if (error) {
                    console.error("Upload Failed:", error);
                } else {
                    console.log("Upload Successful:", result);
                }
            });
    }
});
