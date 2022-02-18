const bcrypt = require("bcryptjs");

const password = "mypass123";
const saltRounds = 10;

async function check(req,res){

    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          throw err
        } else {
          bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
              throw err
            } else {
              console.log(hash);
              //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
            }
          });
        }
      });
   
}
async function check1(req,res){

    return res.send({ success: true, data:"test"});

   
}

module.exports={
    check,
    check1,
}