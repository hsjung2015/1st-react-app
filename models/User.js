const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;


const userSchema = mongoose.Schema({    //schema
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type : String,
        trim : true,    //trim은 공백 없애주는 역할
        unique : 1
    },
    password:{
        type : String,
        minlength: 5
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


userSchema.pre('save', function(next){
    var user = this;
    //비밀번호 암호화 시키기.

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}

 
