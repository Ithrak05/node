var express = require('express');
var router= express.Router();
var AuthController= require("./controller/AuthController");
var Chatcontroller= require("./controller/Chatcontroller");
var Auth=require("./middleware/auth");
var PasswordController= require("./controller/PasswordController");

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/chat/getusers', Chatcontroller.getusers);
router.post('/chat/conversation', Chatcontroller.getuserConv);
router.post('/pass', PasswordController.check1);
router.use(Auth.verifyToken);
// router.post('/register', (req, res) => {
//     console.log(req.body);
//   })
module.exports=router;