import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary";
import 'dotenv/config'
          
cloudinary.config({ 
  cloud_name: 'di4hxdsky', 
  api_key: '657182121641111', 
  api_secret: '4zj6qkmEwxjCvjZmd9RBK-iKTQ0' 
});

export default multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "avatar"
    }
  })
}).single("avatar")

