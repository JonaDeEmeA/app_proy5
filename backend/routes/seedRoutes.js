import express from "express";
//const express = require ("express");
//const data = require ('../data.js');
//const User = require ('../models/userModels.js');
import data from '../data.js';
import { Producto } from "../models/productoModel.js";
import {User} from '../models/userModels.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {

    await Producto.deleteMany({});
    const createdProductos = await Producto.insertMany(data.productos);
    res.send({ createdProductos});
    
    
     await User.deleteMany({});
     const createdUsers = await User.insertMany(data.users);
     res.send({ createdUsers});
    
});



//module.exports = seedRouter;

export default seedRouter; 