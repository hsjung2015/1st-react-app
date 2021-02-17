const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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
    } else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    
    //plainPassword 1234567     DB에 있는 암호화된 비밀번호 $2b$10$Zh6/Q6.c31EfEUogWLnz.u0DF1eUtChhVD4HWb8f9JbLZJ8JpTDfu
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    // jsonwebtoken을 이용해서 token을 생성하기.
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User}

 
