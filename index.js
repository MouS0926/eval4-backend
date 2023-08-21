const express=require("express")
const {connection}=require("./db")
const { userRoute } = require("./route/userRoute")
const { auth } = require("./middleware/auth.middleware")
const { postRouter } = require("./route/postRoute")
const cors=require("cors")


const app=express()

app.use(express.json())
app.use(cors())
app.use("/users",userRoute)
app.use("/posts",postRouter)


// app.get("/",auth,(req,res)=>{
//     res.send("hi")
// })

app.listen(8080,async()=>{
    try {
       await connection
        console.log("conneced to db");
        console.log("srever is running");
    } catch (error) {
        console.log(error);
    }
    
})