//first we are initializing json webtoken module to use functionalities of jwt eg sign, verify
const jwt = require('jsonwebtoken')

//after successful register of user and then calling the login endpoint with already registered user, it will create and return jwt token
const genrateToken =(userdata)=>{
    //IN THIS FUNCTION WE ARE CREATING A NEW/FRESH  JWT TOKEN TO PROVIDE USER , FOR LOGIN
    return jwt.sign(userData , process.env.PRIVATE_KEY);
}

//after login we are gettingṁ
const validateJwtToken = (req , res , next)=>{

    //option2: req header getting token: but not in a right format
    // authorization: basic/bearer
    // basic
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({ err:' Token not available'});
    }
    //we are storing tthe token values from header and splliting to get " bearer xyz.adcs to xyz.dji"
    const token = req.headers.authorization.split(' ')[1];
    //Token provided is wrong throw error msg unauthorized
    if(!token){
        return res.status(401).json({err : ' invalid token'});  
    }
    try{
        // in this errorhandler token is validaedor verified , then move to next middleware
        const validateToken = jwt.verify( token , process.env.PRIVATE_KEY);
        req.user=validateToken;
        next();
    }
    catch(err){
        console.log(" Error occured ", err.message);
    }
}
module.exports = { genrateToken , validateJwtToken};
// const createToken = jwt.sign(payload , process.env.PRIVATE_KEY , (err ,token )=>{
//     if(err){
//         console.error("Invalid : " , err.message);
//     }
//     else{
//         console.log(token);
//     }
// }) 

// try{

// }