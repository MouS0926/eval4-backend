const mongoose=require("mongoose")

const blaclistSchema=mongoose.Schema({
    token:String
},{
    versionKey:false
})

const BlacklistModel=mongoose.model("blacklist",blaclistSchema)
module.exports={
    BlacklistModel
}