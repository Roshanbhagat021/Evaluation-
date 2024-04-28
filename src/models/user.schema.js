const {Schema,model}= require("mongoose")

const userSchema = new Schema({
    name:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const userModel = model("user",userSchema)

module.exports = userModel;