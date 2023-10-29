const mongoose=require('mongoose');
const paitentSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            require:[true,"please enter your paitent name"]
        },
        phone:{
           type:Number,
           require:[true,"please enter paitent phone number"] 
        },
        reports:[{
            status:{
                type:String,
                require:true,
                enum:["Negative","Travelled-Quarantine","Symptoms-Quarantine","Positive-Admit"]
            },
            date:{
                type:Date,
                require:true
            }
        }],
        doctors:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            require:true
        }
    },{
        timestamps:true
    }
)
const Paitent=mongoose.model('Paitent',paitentSchema);
module.exports=Paitent;