require('dotenv').config();
const express=require('express');
const bodyparser=require('body-parser');

const app=express();
const port=process.env.PORT
const db=require('./config/mongoose');

const passport=require("passport");
const pssportLStragey=require('./config/passport-jwt');

app.use(bodyparser.urlencoded());
app.use(bodyparser.json());



app.use('/',require('./routes/index'));
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log('server is running on port',port)
})