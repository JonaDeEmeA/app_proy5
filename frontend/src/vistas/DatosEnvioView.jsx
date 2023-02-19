import { Grid, Box, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarroContext } from "../contexto/CarroContext";

import { PasosCompra } from "../componentes/PasosCompra";


export const DatosEnvioView = () => {

  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(CarroContext);
  const { infoUser, carro: { direccionEnvio } } = state;

  //console.log(direccionEnvio.nombre);
  const [nombre, setNombre] = useState(direccionEnvio.nombre || "");
  const [direccion, setDireccion] = useState(direccionEnvio.direccion || "");
  const [ciudad, setCiudad] = useState(direccionEnvio.ciudad || "");
  const [comuna, setComuna] = useState(direccionEnvio.comuna || "");
  const [fono, setFono] = useState(direccionEnvio.fono || "");

  useEffect(()=>{
    if(!infoUser) {
      navigate("/ingreso?redirect=/envio");
    }
  }, [infoUser, navigate]);
  
  const handlerSubmit = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SHIPPING_ADDRESS_SAVE",
      payload: {
        nombre,
        direccion,
        ciudad,
        comuna,
        fono,
      }
    });
    localStorage.setItem(
      "direccionEnvio",
      JSON.stringify({
        nombre,
        direccion,
        ciudad,
        comuna,
        fono,
      })
    );

    //navigate("/pago");
    navigate("/pedido");

  };

  return (
    
    <Box display="flex" flexDirection= 'column' justifyContent="center" alignItems='center' sx={{ height: "87vh" }}>
      <PasosCompra pasos={1}/>
      <Grid component="form" onSubmit={handlerSubmit} container mt={4} p={4} 

        height="70%"
        alignItems='baseline'
        sx={{ bgcolor: "white", borderRadius: 3, width: { xs: "80%", md: "40%" } }}>


        <Typography variant="h5" align="left" gutterBottom>
          Datos de envio
        </Typography>

        <TextField onChange={(e) => setNombre(e.target.value)}
          fullWidth
          id="outlined-basic"
          label="Nombre Completo"
          variant="outlined"
          required
          value={nombre}
          sx={{ mb: 2 }} />


        <TextField
          onChange={(e) => setDireccion(e.target.value)}
          fullWidth
          id="outlined-password-input"
          label="Dirección"
          required
          value={direccion}
          variant="outlined" sx={{ mb: 2 }} />
        <TextField
          onChange={(e) => setCiudad(e.target.value)}
          fullWidth
          id="outlined-password-input"
          label="Ciudad"
          required
          value={ciudad}
          variant="outlined" sx={{ mb: 2 }} />
        <TextField
          onChange={(e) => setComuna(e.target.value)}
          fullWidth
          id="outlined-password-input"
          label="Comuna"
          required
          value={comuna}
          variant="outlined" sx={{ mb: 2 }} />
        <TextField
          onChange={(e) => setFono(e.target.value)}
          fullWidth
          id="outlined-password-input"
          label="Telefono"
          required
          value={fono}
          variant="outlined" sx={{ mb: 2 }} />


        <Button type="submit" variant="contained">Continuar</Button>
        {/* <Typography ml={2} variant="body2" align="center" gutterBottom>
          Nuevo Registro{" "}
          <Link to={`/registro?redirect=${redirect}`} >Crea tu cuenta Kymani</Link>
        </Typography> */}



      </Grid>
    </Box >
  )

}