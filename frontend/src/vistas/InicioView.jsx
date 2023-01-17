
import { Footer } from "../componentes/Footer"
import data from "../data/data"
import { Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TarjetaProducto from "../componentes/TarjetaProducto";


export const InicioView = () => {

  const navegar = useNavigate();
  const goNavegar =(e)=>{
    //data.producto.map(producto=>(console.log(e.target)))
    let atributo = e.currentTarget.getAttribute("txtproducto");
    console.log(atributo);
    navegar(`/producto/${atributo}`)
    //console.log(data.producto[0].txtProduct);
    // console.log(e.currentTarget.getAttribute("txtproducto"));
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
      data.producto.map(producto=>(
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