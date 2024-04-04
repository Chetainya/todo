const {Router} = require("express");
const User = require("../model/user");

const router = Router();

router.post('/' , async (req , res) => {
    console.log(req.body)
    const {fullName , email , password} = req.body;
    try{
    const user = await User.create({
        fullName,
        email,
        password,
    });
    
    return res.send(user);
}catch(err){
    return res.send({err : err.message})
}

})

router.post('/login' , async (req , res) => {
    const {email , password} = req.body;
    
    try{
    const userInfo = await User.matchPasswordAndGenerateToken(email , password);
    res.cookie("token" , userInfo.token)
    res.cookie("uid" , "hello", {httpOnly:true,secure:true})
    return res.json(userInfo.user);
    }catch(err){
        return res.status(401).json({err : err.message})
    }
})




module.exports = router;