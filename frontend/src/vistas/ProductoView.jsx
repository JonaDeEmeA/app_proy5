
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';


import { Grid, Box, Typography, Button, createTheme } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";
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

  const navigate = useNavigate();
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
        const respuesta = await axios.get(`/api/productos/item/${txtProduct}`);
        dispatch({ type: "PETICION_EXISTOSO", payload: respuesta.data });

      } catch (err) {
        dispatch({ type: "PETICION_FALLO", payload: err.message });
      }


    };
    fetchData();
  }, [txtProduct]);


  const { state, dispatch: ctxDispatch } = useContext(CarroContext);
  const { carro } = state;



  const handlerAddCarro = async () => {

    //si el producto actual existe en el carro o no
    const itemExsite = carro.carroItems.find(e => e._id === producto._id);

    //si existe se imcrementa la cantidad en uno, si no, la cantidad sera 1, 
    const cantidad = itemExsite ? itemExsite.cantidad + 1 : 1;

    //consulta al producto actual. Se controla que la cantidad de items del producto actual, en el carro, no sea menor que cantidad en stock. 
    const { data } = await axios.get(`/api/productos/${producto._id}`);

    try {
      if (data.inStock < cantidad) {
        window.alert("Lo sentimos. El producto no tiene stock");
        return;
      }
    } catch (e) {
      console.log(e)
    }
    //console.log("data");

    //console.log(itemExsite);
    //console.log(cantidad);
    ctxDispatch({
      type: "ADD_ITEM_CARRO",
      payload: { ...producto, cantidad },

    });

    navigate("/carro");

  };



  return (

    loading ? (
      <div>Cargando...</div>
    ) : error ? (
      <div>{error}</div>
    ) : (

      <Box display="flex" justifyContent="center" alignItems='center' sx={{ height: "94vh" }}>
        <Card elevation={8} sx={{ maxWidth: "85%", borderRadius: 3 }} >
          <Grid container
            sx={{
              alignItems: 'center',
              justifyContent: { xs: "center", md: "space-between" },
            }} >


            <Grid item xs={12} sm={5} display="flex" sx={{ justifyContent: 'center' }}>
              <img className="item-img" src={producto.image} alt={producto.name}></img>
            </Grid>

            <Grid item mt={3} xs={12} sm={3}
              sx={{ borderBottom: { xs: 1, md: 0 }, maxWidth: "85%" }}>
              <Typography
                gutterBottom
                align="center"
                id="basic-list-demo"
                variant="h3"
                textTransform="uppercase"
                fontWeight="lg"
              >
                {producto.name}
              </Typography>
              <Typography variant="overline">
                {producto.description}
              </Typography>
            </Grid>

            <Grid item py={5} xs={12} sm={2} xl={2}
              sx={{
                maxWidth: "50%",
                borderLeft: { xs: 0, md: 1 },
                marginRight: { xs: 0, md: 5 },
                pl: { xs: 0, md: 5 }
              }}>

              <Grid container height="100%" display="flex" justifyContent='center' alignContent='center' >
                <Grid item xs={6} sm={6}>
                  <Typography sx={{ fontSize: 18 }} color="text.secondary" >
                    Valor :
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6} textAlign="right">
                  <Typography variant="h5" component="div">
                    ${producto.price}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Typography sx={{ fontSize: 18 }} color="text.secondary" >
                    Status:
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6} textAlign="right">
                  {producto.inStock > 0 ? (
                    <Chip label="En Stock" color="success" />
                  ) : (
                    <Chip label="Sin Stock" color="error" />
                  )}
                </Grid>
                {producto.inStock > 0 && (
                  <Grid mt={2} item xs={12} >
                    <Button type="submit" fullWidth variant="contained" color="warning" onClick={handlerAddCarro}>Agregar</Button>
                  </Grid>
                )
                }
              </Grid>
            </Grid>

          </Grid>
        </Card>
      </Box>
    )

  )

}