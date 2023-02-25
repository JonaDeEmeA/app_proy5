

import { Box, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TarjetaProducto from "../componentes/TarjetaProducto";








export const HomeView = () => {



  const navegar = useNavigate();
  const goProductos = (e) => {

    let atributo = e.currentTarget.getAttribute("txtproducto");
    //console.log(atributo);
    navegar("/productos")

  }
  // background: 'transparent', boxShadow: 'none'
  return (
    <Box className="large-img" display="flex"   alignItems='center' 
    sx={{ 
      minHeight: "86.6vh",
      justifyContent:"center" }}>
    {/* <img className="large-img" src="https://jonadeemea.github.io/Kymani_landing/img/frascos.jpg" alt="frascos"></img> */}
     <Grid container mt={4} 
      
      justifyContent="center"
      
      sx={{ 
        
        width: { xs: "90%", md: "40%" },
         }}>
      <Grid item xs={12} md={8}
      sx={{ 
        
        borderColor: 'warning.light',
        borderRadius: 3, 
        width: { xs: "80%", md: "30%" },
        height: { xs: "60%", md: "40%" } }}>
      <Typography   variant="h1" color="white" align="center" >
          <strong>Pura energía para tu día</strong>
        </Typography>
        <Button type="submit" fullWidth variant="contained" color="warning" size="large" onClick={goProductos}>Ver Productos</Button>
      </Grid>
      

    </Grid>
  </Box >
  );

};
