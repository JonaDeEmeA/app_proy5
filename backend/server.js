import dotenv from 'dotenv';
import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import userRouter from './routes/userRoutes.js';
import productoRouter from './routes/productoRoute.js';
import pedidoRouter from './routes/pedidoRoutes.js';



dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Conectado a la BD')
}).catch(err=>{
  console.log(err.message)
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/keys/paypal", (req, res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID || "sandbox");
});

app.use('/api/seed', seedRouter);
app.use("/api/productos", productoRouter)
app.use('/api/users', userRouter);
app.use("/api/pedidos", pedidoRouter);



app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message});
});



const puerto = process.env.PORT || 5000;
app.listen(puerto, ()=>{
  console.log(`escuchando en el puerto http://localhost:${puerto}`);
});


