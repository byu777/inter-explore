const mongoose = require('mongoose');

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

    primaryInterests:{
        type: String,
        require: true
    },

    secondaryInterests:{
        type: String,
        require: true
    }


});

mongoose.model('User', userSchema);