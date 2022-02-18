const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const settings= require("../../config/settings");
const saltRounds = 10;

var UsersModel = require("../model/schema/UsersModel");

async function verifyToken(req, res, next) {
    console.log(req.headers);
    var token = req.headers["x-access-token"];
    console.log(token);
    if (!token) {
        return res.status(403).send({ statusCode: 403, auth: false, message: "Invalid token" });
    }

    jwt.verify(token, config.secretKey, function (err, decoded) {
        if (err) {
            return res.status(500).send({ statusCode: 500, auth: false, message: "Invalid token" });
        }
        req.session = decoded.data;
        next();
    });
}
module.exports={
    verifyToken,
}