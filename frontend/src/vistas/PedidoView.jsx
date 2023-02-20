import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";


import { CarroContext } from "../contexto/CarroContext";
import { getError } from "../utils.js";

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
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false};
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false};
    
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

  const [{cargando, error, pedido, successPay, loadingPay}, dispatch] = useReducer(reducer,{
    cargando: true,
    pedido: {},
    error: "",
    successPay: false,
    loadingPay: false
  });

  const [{ pendiente }, paypalDispatch] = usePayPalScriptReducer();
 
  
  
 
  
const createOrder = (data, actions)=>{
  //console.log(data);
  return actions.order
  .create({
    purchase_units: [
      {
        amount: { value: pedido.valorTotal },
      },
    ],
  }).then((pedidoId)=>{
    return pedidoId;
  });
};

const onApprove = (data, actions)=>{
  
  return actions.order.capture().then(async function (details){
    try {
      dispatch({ type: "PAY_REQUEST" });
      const { data } = await axios.put(
        `/api/pedidos/${pedido._id}/pago`,
        details, {
          headers: { authorization : `Bearer ${infoUser.token}`},
        }
      );
      dispatch({ type: "PAY_SUCCESS", payload: data });
      alert("Pedido Pagado")
      console.log(data);
    } catch (error) {
      dispatch({ type: "PAY_FAIL", payload: getError(error) })
      alert("el pago falló")
    };
  });
};
 
const onError = (err)=> {
  alert(`onError: ${err}`)
}

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
      dispatch({ type: "FETCH_FAIL", payload: getError(error) });
    };
    
  };

  if (!infoUser) {
    return navigate("/ingreso");
  };

  if (
    !pedido._id || successPay || (pedido._id && pedido._id !== pedidoId)
    ) {
    fetchPedido();
    if (successPay) {
      dispatch({ type: "PAY_RESET" });
    }
  } else{
    const loadPaypalScript = async ()=> {
      const { data: idCliente } = await axios.get("/api/keys/paypal", {
        headers: { authorization: `Bearer ${infoUser.token}` }
      });
      paypalDispatch({
        type: "resetOptions",
        value:{
          "client-id" : idCliente,
          currency : "USD"
        }
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    };

    loadPaypalScript();
  }
}, [pedido, infoUser, pedidoId, navigate, paypalDispatch, successPay]);




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
                Pedido N° {pedidoId}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Nombre:</strong> {pedido.direccionEnvio.nombre} <br />
                <strong>Direccion:</strong> {pedido.direccionEnvio.direccion},
                {pedido.direccionEnvio.ciudad}, {pedido.direccionEnvio.comuna},
                



              </Typography>
              <Typography>
                <strong>Telefono:</strong> {pedido.direccionEnvio.fono} <br />
                {pedido.enviado ? (
                  <strong>Enviado a {pedido.enviadoEn}</strong>
                ) : (
                  <strong>No enviado</strong>
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
            {!pedido.pagado && (
              <ListItem>
                
               
                {pendiente ? ( 
                  <h5>...cargando</h5>
                ) : (
                  
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}>
                      </PayPalButtons>
                  
                )}
                {loadingPay && <h5>...cargando</h5>}
              </ListItem>
            )}
            
          </List>
        </Card>

      </Grid>


    </Grid>
  </Box >
  );
}