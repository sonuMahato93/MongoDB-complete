const mongoose = require('mongoose')
const dotenv = require('dotenv');
const jwt =require('jsonwebtoken')
const path =require('path')
const UserDetails = require('../model/model')
const UniversityDetails= require('../model/universitymodel')
const {Types} = mongoose;

dotenv.config({path:'/config.env'});




// creating a database
exports.create=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Content can not be empty!"})
    return;
    }
    
    const user = new UserDetails({
        name:req.body.name,
        age:req.body.age,
        number:req.body.number,
        email:req.body.email,
        
    })

   // creating the token
    let jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;
 const token =jwt.sign({user},jwtSecretKey)
    user.token =token;
   // console.log(token)
   
   user.save()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).send({message:err.message ||"Some error occurred while creating a create operation "})
    })
}



// // find function //find().limit(10)
// exports.find=(req,res)=>{
//     UserDetails.find().limit(2).skip(0)
//     .then(user=>{
//         res.send(user)
//     })
//     .catch(err=>{
//         res.status(500).send({message:"Cannot find the users"})
//     })
// }





// Using findOne function
exports.findById=(req,res)=>{
const id=req.param.id;
    UserDetails.findOne({id},req.body)
    .then(async data=>{
        if(!data){
            res.status(404).send({message:`Not found with UserID ${id}. UserID not found!`})
        }else{
            res.send(await UserDetails.findOne({id},req.body))
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Please enter UserID information"})
    })
}



// findOne by name
exports.findOne=(req,res)=>{
    const name=req.params.name;
        UserDetails.findOne({name},req.body)
        .then(async data=>{
            if(!data){
                res.status(404).send({message:`Not found with UserName ${name}. UserName not found!`})
            }else{
                res.send(await UserDetails.findOne({name},req.body))
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error Please enter UserName information"})
        })
    }
    



//update a new user identified user by user id
exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update can not be empty"})
    }
const id=req.params.id;
    UserDetails.findOneAndUpdate({_id:Types.ObjectId(id)},req.body)
    .then(async data=>{
        if(!data){
            res.status(404).send({message:`Cannot Update with UseID ${id}. UserID not found!`})
        }else{
            res.send(await UserDetails.findOne({_id:Types.ObjectId(id)},req.body))
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Update UserID information"})
    })

}




// Update user with name
exports.updateByName=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update can not be empty"})
    }
const name=req.params.name;
    UserDetails.findOneAndUpdate({_name:name},req.body)
    .then(async data=>{
        if(!data){
            res.status(404).send({message:`Cannot Update with UserName ${name}. UserName not found!`})
        }else{
            res.send(await UserDetails.findOne({_name:name},req.body))
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Update User information"})
    })

}





//delete a user with spesified user name in the request
exports.deleteByName=(req,res)=>{
    const name=req.params.name;
 UserDetails.findOneAndDelete({name},req.body)
    .then(async data=>{
        if(!data){
            res.status(404).send({message:`Cannot deleted with UserName ${name}. UserName is wrong`})
        }else{
        res.send({message:"User was deleted successfull"})
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Could not delete with UserName = "+name
        });
    });

}



//delete a user with spesified user id in the request
exports.delete=(req,res)=>{
    const id=req.params.id;

    UserDetails.findOneAndDelete({_id:Types.ObjectId(id)},req.body)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot deleted with UserID ${id}. UserID is wrong`})
        }else{
        res.send({message:"User was deleted successfull"})
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Could not delete User with UserID = "+id
        });
    });

}




// Pagination of Data

exports.findAll=async(req,res)=>{
    // destructure page and limit and set default values
  const { skip=1 , limit =1 } = (req.query);
  const page = parseInt(skip)
  try {
    // execute query with page and limit values
    const Users = await UserDetails.find()
    
     .limit(limit * 1)
      .skip((page - 1) * limit)
      //.exec();

    // get total documents in the User collection 
    const count = await UserDetails.countDocuments();
    const NumberOfPage=Math.ceil(count / limit)
// condition if page is greater than number of page then show their is no data
    if(page>NumberOfPage){
   return res.send({
    TotalPages:NumberOfPage,
    CurrentPage: page,
    message:"No More data"
   })
}
else{
// return response with posts, total pages, and current page
    res.json({
      TotalPages: NumberOfPage,
      CurrentPage: page,
      AllUsers:Users
    })
} 
  } catch (err) {
    console.error(err.message);
  }
}








//Creating a ‘get’ request that contains the JWT token in the header and sends verification status as a response.
exports.validateToken= (req, res) => {
//     // Tokens are generally passed in the header of the request
//     // Due to security reasons.
  
//     let tokenHeaderKey = `${ process.env.TOKEN_HEADER_KEY}`;
     let jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;
     const token = req.body.token;
    //  if (!token){
    //              return res.status(403).send("errrr")
    //          }
      try {
        
        // const token = req.body.token;
    const verified = jwt.verify(token, jwtSecretKey);
        
         if(verified){
             return res.send("Successfully Verified");
         }else{
             // Access Denied
             return res.status(401).send(error);
         }
     } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
  }






//Creating University Details
exports.createUniversity=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Content can not be empty!"})
    return;
    }
    
    const university = new UniversityDetails({
        name: req.body.name,
        students: req.body.students
    })
    university.save()
    .then(detail=>{
        res.json(detail)
    })
    .catch(err=>{
        res.status(500).send({message:err.message ||"Some error occurred while creating a create operation "})
    })
}




// Finding University Details & Using Populate() function
exports.find=(req,res)=>{
    UniversityDetails.find()           
    .populate("students")
    .then(university=>{
        res.send(university)
    })
    .catch(err=>{
        res.status(500).send({message:"Cannot find the users"})
    })
}





// Update University Details with studentId
exports.updateUniversity=(req,res)=>{
   
    UniversityDetails.findOneAndUpdate({_id:req.params.id},{$push:{students:req.body.studentId}},(err,doc)=>{
    if (err) throw(err);
    else res.json(doc)
    })}
    // .then(async data=>{
    //     if(!data){
    //         res.status(404).send({message:`Cannot Update with UserName ${students}. UserName not found!`})
    //     }else{
    //         res.send(await UserDetails.findOne({_id:id},req.body))
    //     }
    // })
    // .catch(err=>{
    //     res.status(500).send({message:"Error Update User information"})
    // })

// }
