const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const settings= require("../../config/settings");
const saltRounds = 10;

var UsersModel = require("../model/schema/UsersModel");


async function register(req,res){
    var password=await passwordhash(req.body.registerpass,saltRounds); 
    data={
        name:req.body.registername,
        email:req.body.registermail,
        password:password
    }; 
    user_data =await UsersModel.create(data);
    return res.send({ success: true, data:user_data});
   
}
async function login(req,res){
    var user=await UsersModel.findOne({'email':req.body.loginmail});
    if(user){
        var passcheck=await passwordcheck(user.password,req.body.loginpass);
        if(passcheck){
            var token=jwt.sign({
                data:{
                    user_id:user.id,
                    user_mail:user.email,
                }
            },settings.secretkey, {
                expiresIn: settings.expires_in
            });
            
            var user_det={
                id:user._id,
                name:user.name,
                email:user.email
            };

            return res.send({ success: true,message:"Login Successfully",token:token,data:user_det});
        }else{
            return res.send({ success: true,message:"Invalid Password"});
        }
    }else{
        return res.send({ success: true,message:"login failed"});
    }
}
async function passwordhash(password,saltRounds){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                resolve('');
            }
            resolve(hash);
        });
    });

}
async function passwordcheck(dbpassword,password){
    return new Promise((resolve, reject) => {
        bcrypt.compare(password,dbpassword, function (err, result) {
            if (err) {
                resolve(false);
            }
            resolve(result);
        });
    });
}

module.exports={
    register,
    login,
}