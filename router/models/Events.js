const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema ({

    title: {
        type: String,
        unique: true,
        require: true
    },

    desc: {
        type: String,
        require: true
    },

    location: {
        type: String,
        require: true
    },
    date:{
        type: String,
        require: true
    },

    time:{
        type: String,
        require: true
    },

    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
        }],
    interest_group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "interests"
    },
});
    module.exports = mongoose.model('Events', eventSchema);