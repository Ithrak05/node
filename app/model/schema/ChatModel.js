var mongoose=require('mongoose');
var ChatSchema= new mongoose.Schema({
    sender_id: {
        type: String,
        
        required: true,
        trim: true
      },
      receiver_id: {
        type: String,
       
        required: true,
        trim: true
      },
      message: {
        type: String,
        required: true,
      },
      attach_file: {
        type: String,
        default:null,
      },
      content_type:{
        type: String,
        required: true,
      }
      
});
var Chat=mongoose.model('Chat',ChatSchema);
module.exports=Chat;