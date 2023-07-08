const jwt=require('jsonwebtoken');
const express=require('express');
const router=express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const bcrypt=require('bcryptjs');
const cookie = require('cookie');
const authenticate=require('../middleware/authenticate');
require('../db/connection');
const User=require("../model/userSchema");
router.get('/',(req,res)=>{
    res.send('Hello world from auth js');
});

//----- using async await -----
router.post('/register',async (req,res)=>{
        //console.log(req.body);
        //res.send('register');
        //res.json({message:req.body});
        const {name,email,phone,work,password,cpassword}=req.body;
        if(!name||!email||!phone||!work||!password||!cpassword)
        {
            return res.status(422).json({error:"pls fill all the fields"});
        }
        
        try{
            const userExists=await User.findOne({email:email});
            if(userExists){
                return res.status(422).json({error:"Email already Exists"});
            }
            else if(password!=cpassword)
            {
                return res.status(422).json({error:"passwords are not matching"});
            }
            else
            {
                const user=new User({name,email,phone,work,password,cpassword});
                const userRegister=await user.save();
                if(userRegister)
                {
                    res.status(200).json({message:"user registered successfully"});
                }
                else
                {
                    res.status(500).json({error:"failed to register"});
                }
            }
        }catch(err){
            console.log(err);
        }
       
    });

//----- using promise -----

// router.post('/register',(req,res)=>{
//     //console.log(req.body);
//     //res.send('register');
//     //res.json({message:req.body});
//     const {name,email,phone,work,password,cpassword}=req.body;
//     if(!name||!email||!phone||!work||!password||!cpassword)
//     {
//         return res.status(422).json({error:"pls fill all the fields"});
//     }

//     User.findOne({email:email})
//     .then((userExists)=>{
//         if(userExists){
//             return res.status(422).json({error:"Email already Exists"});
//         }
//         const user=new User({name,email,phone,work,password,cpassword});
//         user.save().then(()=>{
//             res.status(200).json({message:"user registered successfully"});
//         }).catch((err)=>{res.status(500).json({error:"failed to register"})});
//     }).catch(err=>{console.log(err)});
// });


//----- login route -----
router.post('/login',async (req,res)=>{
    let token;
    const {email,password}=req.body;
    if(!password || !email){
        return res.status(422).json({error:"fill all fields"});
    }
    try{
        const userLogin=await User.findOne({email:email});
 
       if(userLogin)
       {
        const isMatch = await bcrypt.compare(password,userLogin.password);
       
        token=await userLogin.generateAuthToken();
        let setCookie = cookie.serialize("jwtoken", token, {
            expires:new Date(Date.now()+300000),
            httpOnly:true            
           });
         setCookie += '; Priority=High'
         res.append('Set-Cookie', setCookie);
        if(!isMatch){
            res.json({message:'Login not Successful'});
        }
        res.json({message:'Login Successful'});
       }
       else{
           res.status(400).json({error:"invalid credentials"});
       }
        
    }catch(error){
        console.log(error);
    }

});

router.get('/about',authenticate,(req,res)=>{
    res.send(req.rootUser);
});

router.get('/getdata',authenticate,(req,res)=>{
    res.send(req.rootUser);
})

router.post('/contact',authenticate,async (req,res)=>{
    try{
        const {email,name,phone,message}=req.body; 
        if(!name || !email || !phone || !message){
            console.log('inside /contact');
            console.log('name --- ',name);
            console.log('email --- ',email);
            console.log('phone --- ',phone);
            console.log('message --- ',message);
            console.log('error in contact form');
            return res.json({error:'pls fill the contact form'})
        }

        const userContact=await User.findOne({_id:req.userID});
        if(userContact)
        {
            const msg=await userContact.addMessage(name,email,phone,message);
            console.log("inside router.post message ---",msg);
             await userContact.save();
             res.status(201).json({message:'user contact successfully'});
              
        }
    }catch(error){
        console.log(error);
    }
})

router.get('/logout',(req,res)=>{
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send('logout successful');
});
module.exports=router;