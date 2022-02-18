const { model } = require("mongoose");
var UsersModel = require("../model/schema/UsersModel");
var ChatModel = require("../model/schema/ChatModel");



async function getusers(req,res){
    var user=await UsersModel.find({});
    if(user){
        res.send({ success:true,message:"User details Found",data:user});
    }else{
        res.send({ success:false,message:"No data Found",data:user});

    }
}
async function getuserConv(req,res){
    var sender_id=req.body.sender_id;
    var receiver_id=req.body.receiver_id;
    try {
        var data= await ChatModel.aggregate([
            {
                $match: {
                    $or: [
                        {
                            "sender_id": sender_id,
                            "receiver_id": receiver_id
                        }, {
                            "receiver_id": sender_id,
                            "sender_id": receiver_id
                        }
                    ]
                }
            }
        ])
    } catch (error) {
        throw error;
    }
    if(data.length){
        res.send({ success:true,message:"Chat details Found",data:data});
    }else{
        res.send({ success:false,message:"No data Found"});
    }
}

async function createConv(message){
    console.log(message);
    return await ChatModel.create(message);
    

}

module.exports={
    getusers,
    getuserConv,
    createConv
}