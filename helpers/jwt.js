const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY

function generateToken(payload){
    return jwt.sign(payload, SECRET_KEY)
}

function verifyToken(token){
    // console.log(token, "======= ini token nya");
    const decoded = jwt.verify(token, SECRET_KEY)
    // console.log(decoded, "======== ini adalah data yang sudah tedecode");
    return decoded
}
module.exports = {generateToken, verifyToken}