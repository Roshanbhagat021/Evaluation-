const {Schema,model}= require("mongoose")

const bookSchema = new Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    genre:{type:String}
})

const bookModel = model("book",bookSchema)

module.exports = bookModel;