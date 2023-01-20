import { Grid, Box, Typography, Alert, AlertTitle, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Button } from "@mui/material";

import { useParams } from "react-router-dom"
import { useState, useEffect, useReducer } from "react";
import axios from "axios";

import {Lista} from "../componentes/Lista"

const reducer = (state, action) => {
  switch (action.type) {
    case "PETICION_SOLICITUD":
      return {...state, loading: true};
    case "PETICION_EXISTOSO":
      return {...state, producto: action.payload, loading: false};
    case "PETICION_FALLO":
      return {...state, loading: false, error: action.payload};
      
  
    default:
      return state;
  };
};

export const ProductoView = ()=>{

  const params = useParams();
  const {txtProduct} = params;

  const [{loading, error, producto}, dispatch] = useReducer(reducer,{
    producto: [],
    loading: true,
    error: ""});

  
  useEffect(()=>{
    const fetchData = async () => {
      dispatch({ type: "PETICION_SOLICITUD"});
      try {
        const respuesta = await axios.get(`/api/producto/${txtProduct}`);
        dispatch({ type: "PETICION_EXISTOSO", payload: respuesta.data });
        
      } catch (err) {
        dispatch({ type: "PETICION_FALLO", payload: err.message });
      }
     
   
    };
    fetchData();
  }, [txtProduct]);

  
  return (loading ? (
    <div>Cargando...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Box sx={{ height: "94vh" }}>
	
			<Grid container  justifyContent="center" >
				<Box display="flex" justifyContent="space-between" sx={{
						mt: 6,
						width: { xs: "70%", sm: "50%", md: "40%", xl: "35%" }
					}}>
					<Grid item xs={6} sx={{bgcolor:"primary.main"}}>
            <img className="large-img" src={producto.image} alt={producto.name}></img>
					</Grid>
					<Grid item xs={3} >
					 <Lista />
					</Grid>
					<Grid item xs={3} >
					
					</Grid>
					</Box>
				</Grid>

			</Box>
  )
    
  )

}