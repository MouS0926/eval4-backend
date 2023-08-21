const express=require("express")
const { UserModel } = require("../model/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { BlacklistModel } = require("../model/blacklistModel")


const userRoute=express.Router()


userRoute.post("/register",async (req,res)=>{

   const { name ,email ,gender ,password ,age ,city ,is_married}=req.body

   try {
    let isExist=await UserModel.findOne({email})
    if(isExist){
        return res.status(200).send({"msg":"User already exist, please login"})
    }
    bcrypt.hash(password, 5, async function(err, hash) {
        if(err){
            res.status(200).send({"err":err})
        }
        else{
            const user=new UserModel({...req.body,password:hash})
            await user.save()
            res.status(200).send({"mesg":"user registered successfully"})
        }
    });





   } catch (error) {
 
    res.status(400).send({"err":error})
   }
})


userRoute.post("/login",async (req,res)=>{

    const { email ,password}=req.body
 

    try {
        const user=await UserModel.findOne({email})
        if(user){
         
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    const token=jwt.sign({userid:user._id,name:user.name},"moumita",{ expiresIn: '7 days' })
                   
                    res.status(200).send({"msg":"user is logged in",token})
                }
                else{
                    res.status(200).send({"err":err})
                    
                }
            });


        }
        else{
            res.status(200).send({"msg":"user not found"})
        }
    } catch (error) {
        res.status(400).send({"error":error})
        
    }
   
 })
 


 userRoute.get("/logout",async (req,res)=>{
    const token=req.headers.authorization
    try {
        const blackedtoken=new BlacklistModel({token})
        await blackedtoken.save()
        res.status(200).send({"msg":"user has been loggedout"})
    } catch (error) {
        res.status(400).send({"err":error})
    }
 })


module.exports={
    userRoute
}