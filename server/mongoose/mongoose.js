const mongoose= require('mongoose')

const connectDB =async()=>{
    try{
        // mongodb connection string
        const connection =await mongoose.connect("mongodb://localhost:27017/collectionName",
            {
            // userNewUrlParser:true,
            // userUnifiedTopology:true,
            // userFindAndModify:false,
            // useCreateIndex:true
        }
        )

        console.log(`MongoDB connected:${connection.connection.host}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);

    }
}


module.exports=connectDB