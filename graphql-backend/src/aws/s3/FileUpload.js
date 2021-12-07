
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

// const bucketName = process.env.AWS_BUCKET_NAME
// const region = process.env.AWS_BUCKET_REGION
// const accessKeyId = process.env.AWS_ACCESS_KEY
// const secretAccessKey = process.env.AWS_SECRET_KEY


const bucketName = "uber-eats-store-0144"
const region = "us-east-2"
const accessKeyId = "AKIAQANTI6XRXDOV24WN"
const secretAccessKey = "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"

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file, fileKey) {
  const fileStream = fs.createReadStream(file.path)
  console.log("bucketName "+bucketName);
  
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileKey
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}