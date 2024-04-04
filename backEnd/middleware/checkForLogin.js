function checkforLogin(){
    return (req , res , next) => {
        if(!req.user){
            return res.json({err : "User not Logged In"});
        }
        return next();
    }
}

module.exports = checkforLogin;