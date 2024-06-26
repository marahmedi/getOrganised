const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(user_id: string){
    const payload = {
        user: user_id
    }
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "2hr"})
}

module.exports = jwtGenerator;