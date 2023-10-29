const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');
const expressLayouts=require('express-ejs-layouts');
const flash=require('connect-flash')
const app=express();
const port=8000;
const db=require('./config/mongoose');
const customMware=require('./config/middleware');
const passport=require("passport");
const pssportLStragey=require('./config/passport-jwt');
const session=require('express-session')
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());

const passportLocal = require('./config/passport-local');

// requiring mongo-store, so that we can use the existing user even after server start
const MongoStore = require('connect-mongo');


app.set('view engine','ejs');
// set path of views
 app.set('views',path.join(__dirname,'views'));

app.use(express.static('./assests'));
app.use(expressLayouts)

 
// mongo store is used to store the session cookie in the db 
app.use(session({
   name: "hospita api",
   // change secret during before deployment in production 
   secret: "blasomething",
   saveUninitialized: false,
   resave: false,
   cookie: {
       maxAge: (1000 * 60 * 100)
   },
   store: MongoStore.create({
       mongoUrl: "mongodb+srv://soumyabera682:K9Y9UZy5mLcTA2Bd@cluster0.f0zp0pk.mongodb.net/?retryWrites=true&w=majority",
       autoRemove: 'disabled'
   },
       (err) => {
           console.log(err || 'connect-mongo setup ok');
       }
   )
}))

// Using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//use flash
app.use(flash());
app.use(customMware.setFlash)

app.use('/',require('./routes/index'));
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log('server is running on port',port)
})