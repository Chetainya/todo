const {Router} = require("express");
const checkforLogin = require("../middleware/checkForLogin");
const todoModel = require("../model/todo");
const { findByIdAndDelete } = require("../model/user");

const router = Router();


router.use(checkforLogin());

router.get('/'  , async (req , res) => {
    
    try{
    const tasks = await todoModel.find({createdBy : req.user.id});
    if(!tasks){
        throw new Error("No tasks Found");
    }
    res.json(tasks);
    }catch(err){
        return res.json({err : err.message})
    }
});

router.post('/new' , async (req , res) => {
    const {title , task} = req.body;
    try{
    await todoModel.create({
        title,
        task,
        createdBy : req.user.id
    })
    return res.json({msg : "Success"});
}catch(err){
    return res.json({err : err.message})
}

});

router.patch('/:id' , async (req , res) => {
    try{
    await todoModel.findByIdAndUpdate(req.params.id , req.body);
    res.json({msg : "success"});
    }catch(err){
        return res.json({err : err.message})
    }
});

router.delete('/:id/compelete' , async (req , res) => {
    try{
        const info = await todoModel.findByIdAndDelete(req.params.id);
        if(!info){
            throw new Error("Task does not Exist");
        }
        res.json({msg : "success"});
    }catch(err){
        return res.json({err : err.message})
    }
});


module.exports = router;