
const passport =require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
 const   ExtractJwt = require('passport-jwt').ExtractJwt;
 const User=require('../model/Doctors');
 let opt={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codial'
 }
 passport.use(new JwtStrategy(opt,function(jwtpayload,done){
      User.findById(jwtpayload._id,function(err,user){
        if(err){
            console.log('error in finding jwt');
            return
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
      })

 }))

module.exports=passport;