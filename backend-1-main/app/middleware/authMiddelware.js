const jwt = require('jsonwebtoken');
const config = require("../config/auth.config.js");

const requireAuth = (req, res, next) => {
    const tokenExist = req.headers["x-access-token"]; //
    if(tokenExist){
        jwt.verify(tokenExist, config.secret ,(err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.status(403);
            }else{
                console.log(decodedToken);
                //res.status(200);
                next();
            }
        })
    }else{
        res.status(403);
        console.log("Unauthorized!!");
    }
}

module.exports = { requireAuth };