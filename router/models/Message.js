const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema ({

   sender:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Users" 
    },

    content: [{
     type: true,
     require: true
    }],
    chat: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "interests"
    },
},
    {
        timestamps : true

    }


);
module.exports = mongoose.model('Message', InterestSchema);
