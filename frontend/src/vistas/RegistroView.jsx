import { useLocation, Link, useNavigate } from "react-router-dom"

import { Grid, Box, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';

import { BtnGeneral } from '../componentes/BtnGeneral';
import Axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CarroContext } from "../contexto/CarroContext";

export const RegistroView = () =>{

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {state, dispatch: ctxDispatch} = useContext(CarroContext);
  const {infoUser} = state;

  const handlerSubmit = async (e)=>{
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden")
      return;
    };
    try{
      const {data} = await Axios.post("/api/users/registro", {
        
        name,
        email,
        password,
      });

      ctxDispatch({type: "SIGNIN_USER", payload: data});
      //Se usa JSON.stringify ya que localstorage acepta datos en string
      localStorage.setItem("infoUser", JSON.stringify(data));
      navigate(redirect || "/");

      //console.log(data);
    } catch (err){
      alert("email o password invalida");
    }
    
  };

  useEffect(()=>{
    if (infoUser) {
      navigate(redirect);
    }
  }, [navigate, redirect, infoUser])

  return (

    <Box display="flex" justifyContent="center" alignItems='center' sx={{ height: "87vh" }}>
      <Grid component="form" onSubmit={handlerSubmit} container p={3} width="80%"
      
        height="60%"
        justifyContent="center"
        alignItems='baseline'
        sx={{ bgcolor: "white", borderRadius: 3, width: { xs: "80%", md: "40%" } }}>

       
        <Typography variant="h5" align="center" gutterBottom>
          Registro
        </Typography>

        

          <TextField onChange={(e)=> setName(e.target.value)}
          fullWidth id="outlined-name" label="Nombre" variant="outlined" />

          <TextField onChange={(e)=> setEmail(e.target.value)}
          fullWidth id="outlined-mail" label="Email" variant="outlined" />
        
        
          <TextField 
          onChange={(e)=> setPassword(e.target.value)}
          fullWidth   
           id="outlined-password-input"
           label="Contraseña"
           type="password"
           autoComplete="current-password"
          variant="outlined" />
          
          <TextField 
          onChange={(e)=> setConfirmPassword(e.target.value)}
          fullWidth   
           id="outlined-confirm-password-input"
           label="Confirmar Contraseña"
           type="password"
          //  autoComplete="current-password"
          variant="outlined" sx={{ mb: 2 }} />
          
          
        <Button type="submit" variant="contained" color="warning">Registrar</Button>
        <Typography ml={2} variant="body2" align="center" gutterBottom>
          Ya tienes una cuenta?{" "}
          <Link to={"/ingreso"} >Ingresar</Link>
          {/* <Link to={`/signin?redirect=${redirect}`} >Ingresar</Link> */}
        </Typography>



      </Grid>
    </Box >

  )
}