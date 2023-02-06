import { useLocation, Link } from "react-router-dom"

import { Grid, Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { BtnGeneral } from '../componentes/BtnGeneral';

export const RegistroView = () => {

  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  return (

    <Box display="flex" justifyContent="center" alignItems='center' sx={{ height: "87vh" }}>
      <Grid container    p={3} width="80%" 
        height="40%" 
        justifyContent="center"
        alignItems= 'baseline'
        sx={{ bgcolor: "success.main", borderRadius: 3 }}>

          
          <Typography variant="h5" align="center" gutterBottom>
            Registro
          </Typography>
          
          
          <TextField fullWidth id="outlined-basic" label="Email" variant="outlined"/>
          <TextField  fullWidth id="outlined-basic" label="Contraseña" variant="outlined"
          sx={{ mb: 2 }} />
          <BtnGeneral  color="warning" nombreBtn="Registrar" />
          <Typography ml={2} variant="body2" align="center"  gutterBottom>
            Nuevo Registro{" "}
            <Link to={`/registro?redirect=${redirect}`} >Crea tu cuenta Kymani</Link>
          </Typography>
          


      </Grid>
    </Box >

  )
}