

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
        
        width: { xs: "80%", md: "30%" },
         }}>
      <Grid item xs={12} md={8}
      sx={{ 
        bgcolor: "crimson",
        borderColor: 'warning.light',
        border: 1,
        borderRadius: 3, 
        width: { xs: "80%", md: "30%" },
        height: { xs: "60%", md: "40%" } }}>
      <Typography   variant="h6" color="white" align="center" >
          Pura energía para tu día
        </Typography>
      <Typography   variant="h6" color="white" align="center" >
      Vitaminas, minerales, fibra y sabor. Con energía positiva la vida es más linda.
      Motivate haz el cambio 🌱
        </Typography>
        <Button type="submit" fullWidth variant="contained" color="error" size="large" onClick={goProductos}>Ver Productos</Button>
      </Grid>
      

    </Grid>
  </Box >
  );

};
