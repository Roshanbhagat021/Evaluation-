const express = require("express")
const connectionDb = require("./src/config/db")
const userModel = require("./src/models/user.schema")
const bcyrpt = require("bcrypt")
const jwt = require("jsonwebtoken")

require("dotenv").config()
app= express()
app.use(express.json())
const port = process.env.PORT


app.get("/",async(req,res)=>{
   res.send("Welcome to the Personal library home page")
})


app.post("/registar",async(req,res)=>{
    const {name,email,password}= req.body;

    const user = await userModel.findOne({email})
    try {
        if(user){
             res.send("User already exists please try to login")
        }else{
            bcyrpt.hash(password,4,async(err,hashedPassword)=>{
                try {
                    const newUser = new userModel({name,email,password:hashedPassword})
                    newUser.save()
                    res.status(201).send("Registration successfull")
                    
                } catch (error) {
                    console.log('error: ', error);
                    res.status(400).send(error)
                    
                }
            })
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(400).send("error:",error)
        
    }
})




app.post("/login",async(req,res)=>{
    const {name,email,password}= req.body;

    const user = await userModel.findOne({email})
    try {
        if(user){
            bcyrpt.compare(password,user.password,async(err,result)=>{
                if(err){
                   return res.status(400).send("Invalid credentials")
                }else{
                    const token =jwt.sign({name,email,password},process.env.SECRET)
                    res.send({message:"Login successfull",token})
                }
            })
        }else{
             res.status(400).send("User not found")
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(400).send("error:",error)
        
    }
})



app.listen(port,()=>{
    connectionDb()
    console.log(`server is running on port ${port} and db connected`)
})
