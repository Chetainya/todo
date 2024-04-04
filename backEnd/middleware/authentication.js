const { validateToken } = require("../service/authentication");

function authenticateViaToken(cookie){
    return (req , res , next) => {
        const token = req.cookies[cookie];
        if(!token){
            return next();
        }
        try{
            const payload = validateToken(token);
            req.user = payload;
        }
        catch(err){
            
        }
        return next();
    }
}
module.exports = authenticateViaToken;