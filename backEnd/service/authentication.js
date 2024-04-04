const jwt = require("jsonwebtoken");

const secret = "Chetainya Manchanda"

function generateToken(user){
    const payload = {
        id : user._id,
        fullName : user.fullName,
        email : user.email
    }
    const token = jwt.sign(payload , secret);
    return token;

}

function validateToken(token){
    const payload = jwt.verify(token , secret);
    return payload;
}

module.exports = {
    generateToken,
    validateToken
}