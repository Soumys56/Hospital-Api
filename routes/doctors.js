const express=require('express');
const router=express.Router();
const doctorController=require('../controllers/doctorcontroller');
//sign in routes
router.get('/signin',doctorController.signIn);
//sign up routes
router.get('/signup',doctorController.signUp);
router.get('/home',doctorController.Home);

//resgister doctor post route
router.post("/register",doctorController.registerDoctor);

router.post('/create-session',doctorController.creteSession);


module.exports=router;