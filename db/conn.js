
const mongoose= require('mongoose');

const connectDB =async()=>{
    try {
        const con = await mongoose.connect('mongodb+srv://venkysingh1931:radhatmt@cluster0.g8fzvij.mongodb.net/', {
          useNewUrlParser:true,
          useUnifiedTopology:true,
          useFindAndModify:false,
          useCreateIndex:true  
        })
console.log(`MongoDDB connnected : ${con.connection.host}`);
    } catch (error) { 
        console.log(error)
        process.exit(1);
    }
}

module.exports=connectDB