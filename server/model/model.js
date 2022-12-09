const mongoose=require('mongoose');

var Detailschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
    },
    number:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    // university:{
    //   type: mongoose.Schema.Types.ObjectId, 
    //   ref: 'UniversityDetails'
    // }, 
     
    token:{
         type:String
     }
 
    
})

const UserDetails = mongoose.model('UserDetails',Detailschema);

module.exports= UserDetails;






