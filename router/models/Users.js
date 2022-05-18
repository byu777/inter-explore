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

    primaryInterest:{
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },

    secondaryInterest:{
        type: String,
        require: true
    }
    // move this here
});

    //add this 

    userSchema.pre('save',function(next){
        var user = this;
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
    
    userSchema.methods.comparePassword = function(password, cb) {
        bcrypt.compare(password, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    } 


    module.exports = mongoose.model('Users', userSchema);