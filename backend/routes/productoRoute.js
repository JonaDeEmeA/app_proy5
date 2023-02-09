import express from "express";
//const express = require ("express");
//const data = require ('../data.js');
//const User = require ('../models/userModels.js');
import data from '../data.js';
import { Producto } from "../models/productoModel.js";


const productoRouter = express.Router();

productoRouter.get('/', async (req, res) => {

    
    const productos = await Producto.find();
    res.send({ productos});
    
});

productoRouter.get("/item/:item", async (req, res)=>{
  const producto = await Producto.findOne({txtProduct : req.params.item});
  console.log(producto);
  if (producto) {
    res.send(producto);
  } else {
    res.status(404).send({message: "Producto x item no encontrado"})
  };
});

productoRouter.get("/:id", async (req, res)=>{
  const producto = await Producto.findById(req.params.id);
  if (producto) {
    res.send(producto);
  } else {
    res.status(404).send({message: "Producto x id no encontrado"})
  };
});


export default productoRouter;