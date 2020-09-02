require("dotenv").config();

const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

const s3Config = new AWS.S3({
  region: "us-east-2",
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
  Bucket: process.env.AWS_BUCKET_NAME,
});

const multerS3Config = multerS3({
  s3: s3Config,
  bucket: process.env.AWS_BUCKET_NAME,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: multerS3Config,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = upload;
