const express = require('express')
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
//const fetch = require('../middleware/fetchdetails');
const jwtSecret = "Haha"


router.post('/createuser',[
body('email').isEmail(),
body('name').isLength({ min: 3 }),
body('password','incorrect password').isLength({ min: 5 })],

async(req,res)=>{
    //let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password,salt);

try{
    // let conn =await mongodb.getConnect();
await User.create({
    name:req.body.name,
    password: secpassword,
    email:req.body.email,
    location:req.body.location
}).then(user =>{
    const data ={
        user: {
            id: user.id
        }
    }
    const authToken = jwt.sign(data,jwtSecret);
    success =true;
    res.json({success, authToken});
})

//res.json({success:true});
.catch(err=>{
    console.log(err);
    res.json({error:"please enter a unique value"});
})
}
catch(error){
    console.log(error.message);
}
});


//authentication a user , no login required

router.post('/loginuser',[
    body('email',"enter a valid email").isEmail(),
    body('password','incorrect password').isLength({ min: 5 })],

async(req,res)=>{
       let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

   // let email = req.body.email;
   const { email, password } = req.body;
    try{
      let user = await User.findOne({email});
if(!user){
    return res.status(404).json({ errors:"Try logging with correct credentials"})
}

const pwdCompare = await bcrypt.compare(password,user.password)


if(!pwdCompare){
    return res.status(404).json({ errors:"Try logging with correct credentials"})
}
const  data = {
    user:{
        id:user.id
    }
}
success = true;
const authToken= jwt.sign(data,jwtSecret)
return res.json({ success,authToken})

    // await User.create({
    //     name:req.body.name,
    //     password:req.body.password,
    //     email:req.body.email,
    //     location:req.body.location
    // })
    
   // res.json({success:true});
    }catch(err){
        console.log(err);
        res.json({success:false});
    }
    })
    
    



module.exports= router;