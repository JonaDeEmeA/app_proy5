//const express = require ("express");
//const data = require ('../data.js');
//const User = require ('../models/userModels.js');
//const bcrypt = require ('bcryptjs');
//const expressAsyncHandler = require('express-async-handler');
//const generateToken = require('./utils');
import express from "express";
import data from '../data.js';
import User from '../models/userModels.js';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import generateToken from '../routes/utils.js';

const userRouter = express.Router();

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({email: req.body.email});
        console.log(user)
        if (user) {
            console.log('aqui')
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({message:'Email o password inválida'})
    })
);
//module.exports = userRouter;
export default userRouter;