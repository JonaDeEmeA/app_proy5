import mongoose from "mongoose";
//const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
    name: {type: String, require: true, uniquq: true},
    email: {type: String, require: true, uniquq: true},
    password: {type: String, require: true},
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model('User', userSchema);
export default User;