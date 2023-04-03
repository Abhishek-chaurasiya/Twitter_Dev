 import mongoose from 'mongoose'

 const likeSchema = new mongoose.Schema({
    onModel:{
        type:String,
        required:true,
        enum:['Tweet','Comment']
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
 },{timestamps:true})

 const Like = mongoose.model('Like',likeSchema);

 export default Like;

/* 
 As likeable will be populated with tweet id or comment id
 we use dynamic references via refpath 
 refpath means moongose will look onModel for finding the correct model either Tweet or Comment
*/