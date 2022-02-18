var express = require('express');
var router= express.Router();
var Auth=require("./middleware/auth");
router.get('/', (req, res) => {
  res.render('auth/login');
})
// router.use(Auth.verifyToken);
router.get('/chat', (req, res) => {
  res.render('chat/chat_index1');
})


module.exports=router;