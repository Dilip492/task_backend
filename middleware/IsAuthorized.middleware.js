const jwt = require("jsonwebtoken")
require("dontenv")

const isAuthorized = (req, res, next) => {

    console.log("checking authorization")


    const token = req.cookies.key;

    if (!token) {

        console.log("No token provided")
        return res.status(403).json({message:"No token provided, access denied"})
    
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {

        if (err) {
            
            return res.status(401).json({message:"Invalid or expire token"})
        }
        console.log("Token verified successfully")
        
        req.user = decode

        console.log(decode)
        

        next();
    });

};


module.exports = isAuthorized;