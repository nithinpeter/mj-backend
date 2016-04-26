var jwt = require("jsonwebtoken");
var _ = require("lodash");

var secret;
if(process.env.NODE_ENV == 'production')
    secret = process.env.SECRET_KEY
else 
    secret = "super-secret"

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), secret, { expiresInMinutes: 60*5 });
}