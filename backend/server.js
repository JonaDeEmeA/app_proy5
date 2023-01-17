require("dotenv").config();
const express = require ("express");
const data = require ("./data.js")
const app = express();



app.get("/api/productos", (req, res)=>{
  
  res.send(data.producto);
});

const puerto = process.env.PORT || 5000;
app.listen(puerto, ()=>{
  console.log(`escuchando en el puerto http://localhost:${puerto}`);
});


