const {connect} = require("mongoose");
require("dotenv").config()


const connectionDb=async()=>{
    await connect(process.env.DBURL)
}


module.exports= connectionDb;