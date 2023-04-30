const User = require("../models/register");
const jwt = require("jsonwebtoken");


const Authenticate = async(req, res, next) =>{
    try{
        
        const token = req.cookies.access_token;
        const verifyToken = jwt.verify(token,"MYNAMEISDARPANKUMARKHATRIKHIPROGROUP");

        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token": token});

        if(!rootUser) { throw new Error('User not found')}
        console.log(rootUser);

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();

    }catch(e){
        res.status(401).send('No token provided')
        console.log(e);
    }

}

module.exports = Authenticate;