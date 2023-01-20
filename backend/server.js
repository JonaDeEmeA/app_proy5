require("dotenv").config();
const express = require ("express");
const data = require ("./data.js")
const app = express();



app.get("/api/productos", (req, res)=>{
  res.send(data.producto);
});

app.get("/api/producto/:item", (req, res)=>{
  const producto = data.producto.find(e => e.txtProduct === req.params.item);
  if (producto) {
    res.send(producto);
  } else {
    res.status(404).send({message: "Producto no encontrado"})
  };
});

const puerto = process.env.PORT || 5000;
app.listen(puerto, ()=>{
  console.log(`escuchando en el puerto http://localhost:${puerto}`);
});


