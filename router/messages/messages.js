const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

module.exports = (req,res,next) => {

    const {authorization } = req.headers;
    
    if (!authorization) {
        return res.status(401).send({ error:' you must login'});
    }

    const token = authorization.replace('bears ' ,  '');
    jwt.verify(token, 'MY_SECRET_KEY', async (err , payload) => {
        if(err) {
            return res.status(401).send({ error:' you must login'});
        }
        const { userId} = payload;
        const user = await Users.findById(userId);
        req.user =user;
        next();
    });

};
