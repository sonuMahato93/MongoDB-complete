const mongoose =require('mongoose')


// Schema for university
var Universityschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    students:[{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'UserDetails' ,
    
}]
    
})

const UniversityDetails = mongoose.model('UniversityDetails',Universityschema);

module.exports= UniversityDetails;