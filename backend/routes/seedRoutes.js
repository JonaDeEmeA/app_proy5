import express from "express";
//const express = require ("express");
//const data = require ('../data.js');
//const User = require ('../models/userModels.js');
import data from '../data.js';
import User from '../models/userModels.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers});
    
});

//module.exports = seedRouter;

export default seedRouter;