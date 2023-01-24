import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { Grid, Box, Typography, Button } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useParams } from "react-router-dom"
import { useState, useEffect, useReducer } from "react";
import axios from "axios";

import Calificacion from "../componentes/Calificacion"
import { BtnGeneral } from '../componentes/BtnGeneral';




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


  return (loading ? (
    <div>Cargando...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Box display="flex" justifyContent="center" alignItems='center' sx={{ height: "94vh" }}>
      {/* <Box display="flex" justifyContent="center" sx={{
          mt: 6,
          //  width: { xs: "95%", sm: "50%", md: "80%", xl: "35%" }, 
          bgcolor: "secondary.main",
          
          
        }}>  */}
      <Grid width="80%" container justifyContent="center"
        sx={{
          bgcolor: "success.main",

        }} >


        <Grid item xs={9} sm={5} display="flex" sx={{ bgcolor: "primary.main", justifyContent: 'center' }}>

          <img className="large-img" src={producto.image} alt={producto.name}></img>

        </Grid>
        <Grid item xs={9} sm={4} sx={{ bgcolor: "error.main" }}>
          
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
        <Grid justifyContent="center"  item xs={9} sm={3} >
          
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
                  <BtnGeneral color="warning" nombreBtn="Agregar"/>
                  </Grid> 
                  )}
              
              
             
              </Grid>  
            </CardContent>
           
          </Card>
          {/* <TableContainer component={Paper}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Valor:</TableCell>
                  <TableCell align="center">${producto.price}</TableCell>
                
               
        
                </TableRow>
              </TableHead>
              <TableBody>
              <TableRow>
                  <TableCell>Status:</TableCell>
                  <TableCell align="center">{producto.inStock>0 ? (
                    <Chip label="En Stock" color="success" />
                  ) : (
                    <Chip label="Sin Stock" color="primary"/> 
                  )}</TableCell>
                
                  
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer> */}
        </Grid>

      </Grid>
      {/* </Box> */}
    </Box>
  )

  )

}