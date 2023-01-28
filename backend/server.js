import dotenv from 'dotenv';
import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import userRouter from './routes/userRoutes.js';
//const dotenv = require("dotenv");
//const express = require ("express");
//const data = require ("./data.js");
//const mongoose = require("mongoose");
//const { default: seedRouter } = require("./routes/seedRoutes.js");
//const { default: userRouter } = require("./routes/userRoutes.js");

//import mongoose from 'mongoose';


dotenv.config();

mongoose
 .connect(process.env.MONGODB_URI).then(()=>{
    console.log('connected to db')
}).catch(err=>{
  console.log(err.message)
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//app.use('/api/seed', seedRouter);
//app.use('/api/users', userRouter);
app.get("/api/users", (req, res)=>{
  
  res.send(data.users);
});

app.get("/api/productos", (req, res)=>{
  
  res.send(data.producto);
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message});
});

const puerto = process.env.PORT || 5000;
app.listen(puerto, ()=>{
  console.log(`escuchando en el puerto http://localhost:${puerto}`);
});


