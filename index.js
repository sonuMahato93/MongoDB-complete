const express = require('express')
const bodyparser = require('body-parser')
const dotenv = require('dotenv');
const connectDB = require('./server/mongoose/mongoose')
const controller =require('./server/controller/controller')


const app = express()
app.use(bodyparser.urlencoded({extended:true}))

connectDB()

app.get('/',(req,res)=>{
    res.send('Wellcome')
})



//API Routing
app.post('/user',controller.create);           //API for creating database
app.post('/university',controller.createUniversity);           //API for creating database

app.get('/users',controller.findAll);             //API to find all user details
app.get('/userId/:id',controller.findById);     //API to find one user using id  
app.get('/userName/:name',controller.findOne);    //API to find one user using name
app.get('/university',controller.find);             //API to find all user details

app.put('/userId/:id',controller.update);       //API for updating data using id
app.put('/userName/:name',controller.updateByName);     //API for updating data using name
app.put('/university/:id',controller.updateUniversity);       //API for updating data using id

app.delete('/userName/:name',controller.deleteByName);   //API for deleting data using name  
app.delete('/userId/:id',controller.delete);   //API for deleting data using id

//app.post("/user/generateToken",controller.generateToken);  //API to generate Token for user
app.get("/user/validateToken",controller.validateToken);   //API to get the validation of token for user         



let PORT = process.env.PORT || 3000;
app.listen(3000,()=>{
    console.log(`Your port is listing on http://localhost:${PORT}`)
})