import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CarroContext } from "../contexto/CarroContext";

import { Grid, Box, Button, TextField, Typography, ListItem, List, Card } from "@mui/material";
import Avatar from '@mui/material/Avatar';

const reducer = (state, action) => {

  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, cargando: true, error:"" };
    case "FETCH_SUCCESS":
      return { ...state, cargando: false, pedido: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, cargando: false, error: action.payload };
    default:
      return state;
  }
}

export const PedidoView = ()=>{
  
  const { state } = useContext(CarroContext); 
  const { infoUser } = state;

  const params = useParams();
  const { id: pedidoId } = params;

  const navigate = useNavigate();

  const [{cargando, error, pedido}, dispatch] = useReducer(reducer,{
    cargando: true,
    pedido: {},
    error: ""
  });

useEffect(()=>{

  const fetchPedido =  async () => {
    try {
      dispatch ({type: "FETCH_REQUEST"});
      const { data } = await axios.get(`/api/pedidos/${pedidoId}`, {
        headers: { authorization : `Bearer ${infoUser.token}`},
      });
      dispatch({ type: "FETCH_SUCCESS", payload: data });
      // data trae los datos del pedido guardados en DB
      //console.log(data);
    } catch (error) {
      dispatch({ type: "FETCH_FAIL",  })
    }
    
  }


  if (!infoUser) {
    return navigate("/ingreso");
  };

  if (
    !pedido._id || (pedido._id && pedido._id !== pedidoId)
    ) {
    fetchPedido();
  } 
}, [pedido, infoUser, pedidoId, navigate]);




  return cargando ? (
    <h6>...cargando</h6>
  ) : error ? (
    alert(error)
  ) : (

    <Box display="flex" flexDirection='column' justifyContent="center" alignItems='center' sx={{ minHeight: "86.6vh" }}>
    
    <Grid container mt={4} p={0}
      height="70%"
      justifyContent="center"
      alignItems='baseline'
      sx={{ bgcolor: "white", borderRadius: 3, width: { xs: "80%", md: "70%" } }}>
      <Grid item xs={12} md={8}>
        <List sx={{ width: "100%" }} >
          <ListItem p={0}>
            <Card sx={{ width: "100%" }} >
              <Typography variant="h5" gutterBottom>
                Datos de envio
              </Typography>
              <Typography variant="subtitle1">
                <strong>Nombre:</strong> {pedido.direccionEnvio.nombre} <br />
                <strong>Direccion:</strong> {pedido.direccionEnvio.direccion},
                {pedido.direccionEnvio.ciudad}, {pedido.direccionEnvio.comuna},
                



              </Typography>
              <Typography>
                <strong>Telefono:</strong> {pedido.direccionEnvio.fono} <br />
                {pedido.enviado ? (
                  <h5>Enviado a {pedido.enviadoEn}</h5>
                ) : (
                  <h5>No enviado</h5>
                )}
              </Typography>
            </Card>
          </ListItem>
          <ListItem>
            <Card>
            <Typography variant="h5" gutterBottom>
                Info Pago
              </Typography>
              {pedido.pagado ? (
                <h5>Pagado en {pedido.pagadoEn}</h5>
              ) : (
                <h5>No Pagado</h5>
              )}
            </Card>
          </ListItem>
          <ListItem >
            <Card sx={{ width: "100%" }}>
              <Typography variant="h5" gutterBottom>
                Items
              </Typography>
              <List>

                {pedido.itemsPedido.map(item => (


                  <ListItem key={item._id}>

                    <Grid container >

                      <Grid item xs={3} display="flex"  >

                        <Avatar alt={item.name} src={item.image}
                          sx={{ width: 70, height: 70 }} />
                        <Link to={`/producto/${item.txtProduct} `} >{item.name}</Link>
                        <span>{item.cantidad}</span>
                        <span>{item.price}</span>
                      </Grid>



                    </Grid>

                  </ListItem>


                ))}

              </List>
              <Link to="/envio" >Editar</Link>
            </Card>
          </ListItem>
        </List>

      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <Typography variant="h5" gutterBottom>
            Resumen
          </Typography>
          <List>
            <ListItem>
              <Typography variant="h5" gutterBottom>
                <span>Productos {pedido.valorItem.toFixed(2)}</span>
              </Typography>

            </ListItem>
            <ListItem>
              <span>Envio{pedido.valorEnvio.toFixed(2)}</span>
            </ListItem>
            <ListItem>
              <span>IVA{pedido.valorIVA.toFixed(2)}</span>

            </ListItem>
            <ListItem>
              <span>Total{pedido.valorTotal.toFixed(2)}</span>

            </ListItem>
            <ListItem>
              <Button
                type="button"
                //disabled={carro.carroItems.length === 0}
                //onClick={handlerConfirmarPedido}
                variant="contained" color="success">
                Confirmar Pedido
              </Button>
             
            </ListItem>
          </List>
        </Card>

      </Grid>


    </Grid>
  </Box >
  );
}