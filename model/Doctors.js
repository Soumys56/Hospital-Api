const mongoose=require('mongoose');
const doctorSchema = new mongoose.Schema({
    name :{
        type : 'String',
        required: [true,"please enter your name"]
    },
    email : {
        type : 'String',
        required : [true,"Enter your email"],

        unique : true
    },
    password : {
        type : 'String',
        minLength:[6,"password should be grater then 6"],
        required : true,
        
    },
   
}, 
{
    timestamps : true
}
);

const User = mongoose.model('User' , doctorSchema);
module.exports = User;