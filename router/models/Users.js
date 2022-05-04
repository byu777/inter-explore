const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema ({

    email: {
        type: String,
        unique: true,
        require: true
    },

    password: {
        type: String,
        require: true
    },
    // add firstName and lastName
    firstName:{
        type: String,
        require: true
    },
    userName:{
        type: String,
        require: true
    },

    primaryInterests:{
        type: String,
        require: true
    },

    secondaryInterests:{
        type: String,
        require: true
    }
    // move this here
});

    //add this 

    userSchema.pre('save',function(next){
        const user = this;
        if(!user.isModified('password')){
            return next();
        }

        bcrypt.genSalt(10, (err, salt) => {
        
        if (err){
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err){
                return next(err)
            }
            user.password = hash;
            next();
        });
        });
    });
    userSchema.methods.comparePassword = function(pass) {
        return new Promise((resolve,reject) =>{ 
            bcrypt.compare(pass,user.password, (err, isMatch) => {
                if(err){
                    return reject (err);
                }
                if (!isMatch){
                    return reject(false);
                }
                resolve(true);
            });

        });
    } 


    module.exports = mongoose.model('User', userSchema);