const dotenv=require('dotenv');
const mongoose=require('mongoose');
const express=require('express');
const app=express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
dotenv.config({path:'./config.env'});
require('./db/connection');

const User=require('./model/userSchema');

app.use(require('./router/auth'));
const PORT=process.env.PORT||3000;


// const middleware=(req,res,next)=>{
//     console.log('inside middleware');
//     next();
// }
// app.get('/',(req,res)=>{
//     res.send('Hello world');
// });
// app.get('/about',(req,res)=>{
//     res.send('about');
// });
// app.get('/contact',(req,res)=>{
//     res.send('contact');
// });
// app.get('/login',(req,res)=>{
//     res.send('login');
// });
// app.get('/register',(req,res)=>{
//     res.send('register');
// });

if(process.env.NODE_ENV==="production")
{
    app.use(express.static("client/build"));
}
app.listen(PORT,()=>{
    console.log('listening...');
});