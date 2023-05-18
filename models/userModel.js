const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    is_admin:{
        type:Number,
        default:0
    },
    is_verified:{
        type:Number,
        default:1
    },
});

module.exports = mongoose.model('User',userSchema)