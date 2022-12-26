const mongoose = require('mongoose')

const urlModel = new mongoose.Schema({
    urlCode: { 
        type:String,
        lowercase:true,
        trim:true,
        required:true
        }, 
    longUrl: {
        type:String,
        required:true,
    },
     shortUrl: {
        type:String,
        unique:true
    } 
},{timestamps:true})

module.exports = mongoose.model('url', urlModel)