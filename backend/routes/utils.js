import jwt from 'jsonwebtoken';
//const jwt = require ('jsonwebtoken');
const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
        }, 
        process.env.JWT_SECRET, {
        expireIn: '30d'
    });
};
//module.exports = generateToken;
export default generateToken;