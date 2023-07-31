
const mongoose= require('mongoose');

const connectDB =async()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URL_ALT, {
          useNewUrlParser:true,
          useUnifiedTopology:true,  
        })
console.log(`MongoDDB connnected : ${con.connection.host}`);
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}
  
module.exports=connectDB