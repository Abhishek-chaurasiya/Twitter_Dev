import mongoose from 'mongoose'

const hashtagSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    tweets:[
        {  //Each hashtag can be present in multiple tweets
            type:mongoose.Schema.Types.ObjectId,
            ref:'Tweet'
        }
    ]

},{timestamps:true})



const Hashtag = mongoose.model('Hashtag',hashtagSchema)
export default Hashtag