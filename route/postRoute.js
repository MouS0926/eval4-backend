const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { PostModel } = require("../model/postModel")
const { auth } = require("../middleware/auth.middleware")



const postRouter=express.Router()

postRouter.post("/add",auth,async(req,res)=>{
    try {
        const post=new PostModel(req.body)
        await post.save()
        console.log(post);
        res.status(200).send({"msg":"a new post is added"})

    } catch (error) {
        res.status(400).send({"err":error})
    }
})


postRouter.patch("/update/:postid",auth,async(req,res)=>{

    const {postid}=req.params
    

    try {
        const post=await PostModel.findOne({_id:postid})
        
            post=await  PostModel.findByIdAndUpdate({_id:postid},req.body)
            res.status(200).send({"msg":" post is updated"})
       
      
    } catch (error) {
        res.status(400).send({"err":error})
    }
})






module.exports={
    postRouter
}