const mongoose = require('mongoose');

const userSchema = mongoose.Schema({    //schema
    name:{
        type:String,
        maxlength: 50
    },
    email:{
        type : String,
        trim : true,    //trim은 공백 없애주는 역할
        unique : 1
    },
    password:{
        type : String,
        maxlength: 10
    },
    lastname: {
        type : String,
        maxlength : 50
    },
    role : {
        type : Number,
        default : 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}

 
