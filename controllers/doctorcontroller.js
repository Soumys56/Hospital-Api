const Doctor=require('../model/Doctors');
const Paitent=require('../model/Patient');
require("dotenv").config();
const jwt=require('jsonwebtoken');

//doctor sign up page

module.exports.signUp=async function(req,res){
    return res.render('signup',{
        title:"signup pge"
    })

}

//doctor sign in
module.exports.signIn=async function(req,res){
    return res.render('signin',{
        title:"signup pge"
    })
    
}


module.exports.Home=async function(req,res){
    return res.resnde('home')
}



module.exports.registerDoctor=async function(req,res){
   try{
           
        const doctor=await Doctor.findOne({email:req.body.email});
        if(doctor){
            res.status(200).json({
                success:true,
                message:"already exist"
            })

        }
        await Doctor.create(req.body);
        return res.redirect('/doctor/signin')

   }catch(err){

   }
}

//sign in controller

// module.exports.creteSession=async function(req,res){
//     try{
//         const user=await Doctor.findOne({email:req.body.email});
//         if(!user|| user.password!=req.body.password){
//          return res.json(422,{
//              message:"email or password not match"
//          })
//         }
//         else{
       
//             res.json(299,{
//              message:"sign in sucessfully ,here is your token ,plz keep in safe",
//              redirect:'/doctor/home',
//              data:{
//                  token:jwt.sign(user.toJSON(),'codial',{expiresIn:1000})
//              }
//          })
         
//         }

//  }catch(err){
//      return res.json(500,{
//          message:"Internal server error"
//      })
//  }

// }
// const jwt = require('jsonwebtoken'); // Import the JWT library if not already imported

module.exports.creteSession = async function (req, res) {
    try {
        const user = await Doctor.findOne({ email: req.body.email });

        if (!user || user.password !== req.body.password) {
            return res.status(422).json({
                message: "Email or password do not match"
            });
        } else {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });

            res.status(200).json({
                message: "Sign in successful. Here is your token. Please keep it safe.",
                data: {
                    token,
                    
                }
            });
          
        }

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

//register ptient controller
module.exports.registerPatient=async (req,res)=>{
    try{
        req.body.doctors="653e2e91b1eadb2cced8e402"
        const patient=await  Paitent.create(req.body);
        res.status(200).json({
            success:true,
            message:"patient create sucessfully"
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Could not create Patient,Internal server error"
        })
    }
}
//patient report creaate controller
module.exports.createReport=async function(req,res){
    try{
        const paitent=await Paitent.findById(req.params.id);
        req.body.date=Date.now();
        paitent.reports.push(req.body);
        paitent.save();
        res.status(200).json({
            success:true,
            message:"patient report sucessfully created"
        })


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"report not created sucessfully"
        })
    }
}
module.exports.all_reports=async function(req,res){
    try{
        const patient=await Paitent.findById(req.params.id);
        return res.status(200).json({
            success:true,
            patient:patient.reports
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"All reports created sucessfully"
        })
    }
}
//pathient report finding controller

module.exports.allReports=async function(req,res){
    try{
      
        const patient=await Paitent.find({ reports :{ $elemMatch: {status:req.body.status}},});
        console.log( patient)
        
        res.status(200).json({
            success:true,
            report:patient
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"All reports display error"
        })
    }
}