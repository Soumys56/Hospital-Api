const mongoose=require('mongoose');
require('dotenv').config()
const Mongodb=process.env.MONGO_DB_URL;
mongoose.connect(Mongodb).then(()=>{
    
    console.log("DB connected");
    

}).catch(error => console.log(error));