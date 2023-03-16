import mongoose from "mongoose";
// import * from 
const connectDB = (url)=>{
    // mongoose.set('StrictQuery',true);

    mongoose.connect(url)
    .then(()=>console.log('MongoDB connected'))
    .catch((err)=>console.log(err));
}

export default connectDB;