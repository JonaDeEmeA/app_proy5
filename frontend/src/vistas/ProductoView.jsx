

import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { Grid, Box, Typography, Button, createTheme } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useParams } from "react-router-dom"
import { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";

import Calificacion from "../componentes/Calificacion"
import { BtnGeneral } from '../componentes/BtnGeneral';
import { CarroContext } from "../contexto/CarroContext";





const reducer = (state, action) => {
  switch (action.type) {
    case "PETICION_SOLICITUD":
      return { ...state, loading: true };
    case "PETICION_EXISTOSO":
      return { ...state, producto: action.payload, loading: false };
    case "PETICION_FALLO":
      return { ...state, loading: false, error: action.payload };


    default:
      return state;
  };
};

export const ProductoView = () => {

  const params = useParams();
  const { txtProduct } = params;

  const [{ loading, error, producto }, dispatch] = useReducer(reducer, {
    producto: [],
    loading: true,
    error: ""
  });


  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "PETICION_SOLICITUD" });
      try {
        const respuesta = await axios.get(`/api/producto/${txtProduct}`);
        dispatch({ type: "PETICION_EXISTOSO", payload: respuesta.data });

      } catch (err) {
        dispatch({ type: "PETICION_FALLO", payload: err.message });
      }


    };
    fetchData();
  }, [txtProduct]);


   const {state, dispatch: ctxDispatch} = useContext(CarroContext);

   const handlerAddCarro=()=>{

    console.log("el btn");
     ctxDispatch({
      type: "ADD_ITEM_CARRO",
      datos: {...producto, cantidad: 1},
     });
   };

  return (loading ? (
    <div>Cargando...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Box display="flex" justifyContent="center" alignItems='center' sx={{ height: "94vh" }}>
  
      <Grid width="80%" container justifyContent="center"
        sx={{
          bgcolor: "success.main",}} >


        <Grid item  xs={12} sm={5} display="flex" sx={{ bgcolor: "primary.main", justifyContent: 'center' }}>

          <img className="large-img" src={producto.image} alt={producto.name}></img>

        </Grid>
        <Grid item xs={12} sm={4} sx={{ bgcolor: "error.main" }}>
          
          <Typography
            id="basic-list-demo"
            level="body3"
            textTransform="uppercase"
            fontWeight="lg"
          >
            Ingredients
          </Typography>
          <List aria-labelledby="basic-list-demo">
            <ListItem><h1>{producto.name}</h1></ListItem>
            <Calificacion numRating={producto.rating} />
            <ListItem>Valor : ${producto.price}</ListItem>
            <ListItem>Descripcion :{producto.description} </ListItem>
          </List>

        </Grid>
        <Grid justifyContent="center"  item xs={12} sm={3} xl={2}>
          
          <Card  >
            <CardContent  display="flex"  >
              
              <Grid container >
                <Grid item xs={6} sm={6}>
              <Typography  sx={{ fontSize: 18 }} color="text.secondary" >
                 Valor : 
              </Typography>
              </Grid>
              
              
              <Grid item xs={6} sm={6}> 
              <Typography  variant="h5" component="div">
              ${producto.price}
              </Typography>
              </Grid>
              
                <Grid item xs={6} sm={6}>
              <Typography  sx={{ fontSize: 18 }} color="text.secondary" >
                Status: 
              </Typography>
              </Grid>
              
              
              <Grid item xs={6} sm={6}> 
              {producto.inStock >0 ? (
                    <Chip label="En Stock" color="success" />
                  ) : (
                    <Chip label="Sin Stock" color="error"/> 
                  )}
              </Grid>

              
              {producto.inStock > 0 && (
                 <Grid mt={2} item xs={12} > 
                  <BtnGeneral color="warning" nombreBtn="Agregar" accion={handlerAddCarro}/>
                  </Grid> 
                  )}
              
              
             
              </Grid>  
            </CardContent>
           
          </Card>
       
        </Grid>

      </Grid>
    
    </Box>
  )

  )

}