
import express from "express";
import data from '../data.js';
import Pedido from '../models/pedidoModel.js';
import User from '../models/userModels.js';

import expressAsyncHandler from 'express-async-handler';
import isAuth from './utils.js';


const pedidoRouter = express.Router();

pedidoRouter.post("/", expressAsyncHandler(async (req, res)=>{
    const newPedido = new Pedido({
        itemsPedido: req.body.itemsPedido.map((elem) => ({...elem, producto: elem._id})),
        direccionEnvio: req.body.direccionEnvio,
        valorItem: req.body.valorItem,
        valorEnvio: req.body.valorEnvio,
        valorIVA: req.body.valorIVA,
        valorTotal: req.body.valorTotal,
        //user: req.usuario._id
    });

     //console.log(`valores de llegada ${newPedido.valorEnvio}`);

    const pedido = await newPedido.save();
    res.status(201).send({message: "Nuevo Pedido Creado", pedido});
})

);


pedidoRouter.get("/:id", expressAsyncHandler(async (req, res)=>{
  const pedido = await Pedido.findById(req.params.id);
  if (pedido) {
    res.send(pedido);
  } else {
    res.status(404).send({ message: "Pedido No Encontrado" })
  };
})

);


export default pedidoRouter;