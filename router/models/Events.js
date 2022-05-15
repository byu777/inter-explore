const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const eventSchema = new mongoose.Schema ({

    desc: {
        type: String,
        unique: true,
        require: true
    },

    location: {
        type: String,
        require: true
    },
    // add firstName and lastName
    day:{
        type: String,
        require: true
    },
    month:{
        type: String,
        require: true
    },

    year:{
        type: String,
        require: true
    },

    time:{
        type: String,
        require: true
    },

    key: {
        type: int,
        require: true,
        unique: true,
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users" 
    }],
    CurrentGroup:
    {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "interests"
    }
},
    {
        timestamps : true

    }

);

    //add this 

    eventSchema.pre('save',function(next){
        var event = this;
        
    });
    

    module.exports = mongoose.model('Events', eventSchema);