const multer = require('multer');
const path = require('path');

// Check if Cloudinary credentials are available
const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;

let storage;

if (useCloudinary) {
    // Use Cloudinary for production (Render deployment)
    const cloudinary = require('cloudinary').v2;
    const { CloudinaryStorage } = require('multer-storage-cloudinary');

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'graphixpert',
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'webm', 'mov', 'avi'],
            resource_type: 'auto'
        }
    });
} else {
    // Use local storage for development
    storage = multer.diskStorage({
        destination(req, file, cb) {
            const fs = require('fs');
            const dir = 'uploads/';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            cb(null, dir);
        },
        filename(req, file, cb) {
            cb(
                null,
                `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
            );
        },
    });
}

function checkFileType(file, cb) {
    // Support images and videos
    const filetypes = /jpg|jpeg|png|gif|webp|mp4|webm|mov|avi/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = /image|video/.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images and videos only!');
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 200 * 1024 * 1024, // 200MB max file size
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

module.exports = upload;
