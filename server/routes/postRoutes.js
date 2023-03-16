import express from "express";
import * as dotenv from "dotenv";

import { v2 as cloudinary } from 'cloudinary';
import Post from "../mongodb/models/post.js";
import authorize from "../middleware/authorization.js"


dotenv.config();

const router = express.Router();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

// creating get all posts route

router.route('/').get(async (req,res)=>{
 try {
    const posts = await Post.find({});
    res.status(200).json( {success : true, data:posts } )
} catch (error) {
     res.status(500).json( {success : false, message:error } )
    
 }

})



// creating a post route

router.route('/').post( authorize ,async (req,res)=>{
  try {
        const {name,prompt ,photo} = req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);
        
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
            author_id:req.user._id,
        })
    res.status(201).json({ success: true, data:newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message:error });
  }

});

// getting profile posts
router.get('/profile-posts', authorize, async (req, res) => {
  try {
      const posts = await Post.find({ author_id: req.user._id}).sort({ createdAt: -1 });
      console.log("inside profile-posts");
      res.status(200).json({ success: true, data: posts });
  } catch (err) {
      res.status(500).json({ success: false, data: err.message });
  }
})

export default router
