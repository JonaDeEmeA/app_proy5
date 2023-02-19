import { useLocation, Link, useNavigate } from "react-router-dom"

import { Grid, Box, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';

import { BtnGeneral } from '../componentes/BtnGeneral';
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CarroContext } from "../contexto/CarroContext";

export const IngresoView = () =>{

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {state, dispatch: ctxDispatch} = useContext(CarroContext);
  const {infoUser} = state;

  const handlerSubmit = async (e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.post("/api/users/signin", {
        
        email,
        password,
      });

      ctxDispatch({type: "SIGNIN_USER", payload: data});
      //Se usa JSON.stringify ya que localstorage acepta datos en string
      localStorage.setItem("infoUser", JSON.stringify(data));
      navigate(redirect || "/");

      console.log(data);
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
      
        height="40%"
        justifyContent="center"
        alignItems='baseline'
        sx={{ bgcolor: "white", borderRadius: 3 }}>

       
        <Typography variant="h5" align="center" gutterBottom>
          Ingreso
        </Typography>

        
          {/* <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}

          <TextField onChange={(e)=> setEmail(e.target.value)}
          fullWidth id="outlined-basic" label="Email" variant="outlined" />
        
        
          <TextField 
          onChange={(e)=> setPassword(e.target.value)}
          fullWidth   
           id="outlined-password-input"
           label="Contraseña"
           type="password"
           autoComplete="current-password"
          variant="outlined" sx={{ mb: 2 }} />
          
          
        <Button type="submit" variant="contained">Ingresar</Button>
        <Typography ml={2} variant="body2" align="center" gutterBottom>
          Nuevo Registro{" "}
          <Link to={`/registro?redirect=${redirect}`} >Crea tu cuenta Kymani</Link>
        </Typography>



      </Grid>
    </Box >

  )
}