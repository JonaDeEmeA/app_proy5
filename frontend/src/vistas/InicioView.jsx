
import { Footer } from "../componentes/Footer"
// import data from "../data/data"
import axios from "axios";
import { Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TarjetaProducto from "../componentes/TarjetaProducto";
import { useState, useEffect } from "react";



export const InicioView = () => {

  const [producto, setProducto] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {
      const respuesta = await axios.get("/api/productos")
     
      setProducto(respuesta.data)
    };
    fetchData();
  }, []);



  const navegar = useNavigate();
  const goNavegar =(e)=>{
    
    let atributo = e.currentTarget.getAttribute("txtproducto");
    console.log(atributo);
    navegar(`/producto/${atributo}`)
    
  }

  return ( 
    <>
     
      
      <Box component="main" bgcolor="primary.main" className="contenedor"
      sx={{ display: 'flex',
      }} >
        <Grid container
        sx={{ 
        justifyContent: 'space-around'}} >
           {
      producto.map(producto=>(
        <Grid item m={2} key={producto.txtProduct}  >
            <TarjetaProducto
            txtProducto={producto.txtProduct}
            accion={goNavegar}
            valor={producto.price}
            producto={producto.name} 
            imagen={producto.image}
            />
          </Grid>
      ))
      } 
        

        </Grid>
      </Box>
      <Footer />
    </>
  );

};