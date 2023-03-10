
import express from "express";
import data from '../data.js';
import Pedido from '../models/pedidoModel.js';
import {User} from '../models/userModels.js';

import expressAsyncHandler from 'express-async-handler';
import {isAuth} from './utils.js';



const pedidoRouter = express.Router();

pedidoRouter.post("/", expressAsyncHandler(async (req, res)=>{
    const newPedido = new Pedido({
        itemsPedido: req.body.itemsPedido.map((elem) => ({...elem, producto: elem._id})),
        direccionEnvio: req.body.direccionEnvio,
        valorItem: req.body.valorItem,
        valorEnvio: req.body.valorEnvio,
        valorIVA: req.body.valorIVA,
        valorTotal: req.body.valorTotal,
        idUsuario: req.body.idUsuario
    });

     //console.log(`valores de llegada ${newPedido}`);

    const pedido = await newPedido.save();
    res.status(201).send({message: "Nuevo Pedido Creado", pedido });
})

);


pedidoRouter.get("/propio",
  expressAsyncHandler(async (req, res)=>{
    const filter = {idUsuario : req.headers.idusuario}
    const pedidos = await Pedido.find(filter);
    
    if (pedidos) {
      res.send(pedidos);
    } else {
      res.status(404).send({ message: "No hay Pedidos" })
    };
    
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

pedidoRouter.put("/:id/pago",
expressAsyncHandler(async (req, res)=>{
  const pedido = await Pedido.findById(req.params.id);
  if (pedido) {
    pedido.pagado =  true;
    pedido.pagadoEn = Date.now();
    pedido.PaymentResult = {
      id : req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    };
    const pedidoUpdate = await pedido.save();
    res.send({ message: "Pedido Pagado", pedido: pedidoUpdate })
  }else{
    res.status(404).send({ message: "Pedido No Econtrado" });
  };
})
);

pedidoRouter.delete("/propio",
  expressAsyncHandler(async (req, res)=>{
    const filter = {idUsuario : req.headers.idusuario}
    const pedidos = await Pedido.deleteOne(filter);
    
    if (pedidos) {
      res.send(pedidos);
    } else {
      res.status(404).send({ message: "No hay Pedidos" })
    };
    
  })
);


export default pedidoRouter;