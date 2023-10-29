const mongoose=require('mongoose');
const Mongodb="mongodb+srv://soumyabera682:K9Y9UZy5mLcTA2Bd@cluster0.f0zp0pk.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(Mongodb).then(()=>{
    
    console.log("DB connected");
    

}).catch(error => console.log(error));