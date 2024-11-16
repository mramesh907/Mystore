import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

// this is good for ecommerce
// cloudinary.uploader.upload_stream():

const uploadImageCloudinary = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

  const uploadImage = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'Mystore',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(buffer);
  });

  return uploadImage;
};

/*
cloudinary.uploader.upload():----
const uploadImageCloudinary = async (localFilePath)=>{
  try {
    if(!localFilePath) return null;
    // upload the file on cloudinary
   const result = await cloudinary.uploader.upload(localFilePath,{
      resource_type: 'auto',
      folder: 'Mystore'
    })
    // file has benn uploaded on cloudinary
    console.log("result",result.url);
    // delete the file from the server
     fs.unlinkSync(localFilePath);
    return result;
    
  } catch (error) {
    fs.unlinkSync(localFilePath);//delete the file from the server
    return null;
  }
} 
*/

export default uploadImageCloudinary;
