// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs"
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const dotenv = require("dotenv")

/*
 cloudinary.v1, which does not support the config method. The config method is available in cloudinary.v2
  */

// Configuration
cloudinary.config({
    cloud_name: process.env.CLODINARY_CLOUD_NAME,
    api_key: process.env.CLODINARY_API_KEY,
    api_secret: process.env.CLODINARY_API_SECRET  // Click 'View Credentials' below to copy your API secret
});
 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',//cloudinary folder
      format: async (req, file) => 'png', // supports promises as well |async (req, file) => 'png'
      //public_id: (req, file) => 'computed-filename-using-request',
    },
  });

module.exports = {
    cloudinary,
    storage
}

/*
The error you're encountering is due to a conflict between the cloudinary and multer-storage-cloudinary package versions. 
Specifically, multer-storage-cloudinary@4.0.0 expects cloudinary@^1.21.0, but you have cloudinary@2.4.0 installed.
 
You can downgrade your cloudinary package to a version compatible with multer-storage-cloudinary:

uninstall the current version of cloudinary:
npm uninstall cloudinary
Install the older version of cloudinary that is compatible:
npm install cloudinary@1.21.0 multer-storage-cloudinary

*/