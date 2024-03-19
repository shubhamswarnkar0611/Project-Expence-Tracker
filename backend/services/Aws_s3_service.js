const AWS = require("aws-sdk");
require("dotenv").config();

exports.UploadToS3 = (fileName, data) => {
    const s3Bucket = new AWS.S3({
      accessKeyId: process.env.IAM_USER_KEY_ID,
      secretAccessKey: process.env.IAM_USER_SECRET_KEY,
    });
  
  
      var params = {
        Bucket: "spentwise",
        Key: fileName,
        Body: JSON.stringify(data),
        ACL:'public-read'
      };
  
      return new Promise((resolve, reject) => {
        s3Bucket.upload(params, async(err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        });
      })
  
     
  
  };