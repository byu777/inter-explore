const express = require('express');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req,res)=> {
// add first name and username
const {email, password, firstName, userName, primaryInterests,secondaryInterests} = req.body;

try {
    const user = new User ({email, password, firstName, userName,primaryInterests,secondaryInterests });
    await user.save();
    const token = jwt.sign({ userId: user._id}, 'MY_SECRET_KEY');
    res.send(token);
}catch (err){
return res.status(422).send(err.message);
}


});
//add this too
router.post('/signin', async (req,res)=> {
    const {email, password } = req.body;
    if (!email || !password){
     return res.status(422).send({ error: 'Must provide email and passward'});
    }
   
    const user = User.findOne({email, password});
  //  console.log(user);
    if(!user) {
        return res.status(422).send({ error: 'email not found'});
    }
    try{
        await user.comparePassword(password);
 const token = jwt.sign({ userId: user._id, password: user.password}, 'MY_SECRET_KEY');
    res.send(token);

    }
    catch (err){
       // console.log(user);
       // console.log(password);
        console.log(err);
        return res.status(422).send({ error: 'Must provide with password'});
    }
   });


module.exports = router;