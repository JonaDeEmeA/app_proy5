import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import { PasosCompra } from "../componentes/PasosCompra";
import { CarroContext } from "../contexto/CarroContext";
import { getError } from "../utils.js";

import { Grid, Box, Button, TextField, Typography, ListItem, List, Card } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

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

    <Box display="flex" flexDirection="column" alignItems='center' justifyContent="space-evenly"  sx={{ minHeight: "87vh" }}>
    <PasosCompra pasos={3} />
    <Grid container  sx={{
          maxWidth: { sx: "90%", md: "70%" },
          justifyContent: { xs: "center", md: "space-evenly" }
        }}>
      <Grid  item xs={10} md={8} sx={{ mb: { xs: 2, md: 0 }, }}>
      <Card sx={{ height: "100%", borderRadius: 2 }} >
            <List>
              {pedido.itemsPedido.map(item => (
                <>
                  <ListItem key={item._id}>
                    <Grid container display="flex" justifyContent="space-between" alignItems='center' >
                      <Grid item xs={2}  >
                        <Avatar alt={item.name} src={item.image}
                          sx={{ width: 70, height: 70 }} />
                      </Grid>
                      <Grid item xs={4}>
                        <Typography textAlign="left">
                          <Link to={`/producto/${item.txtProduct} `} >{item.name}</Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={3}  >
                        <Typography>{`X ${item.cantidad}`}</Typography>
                        <Typography>{`$${item.price * item.cantidad}`}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>

          </Card>

      </Grid>
      <Grid item xs={10} md={3}  >
          <Card sx={{ height: "100%", borderRadius: 2 }} >
            <Grid item mx={2} mb={2} display="flex" flexDirection="column" justifyContent="center" sx={{ mt: { xs: 1, md: 3 } }}>


              <Typography variant="h5" textAlign="center" gutterBottom>
                Estado de Pago
              </Typography>
              {pedido.pagado ? (
                                 
                  <Chip label="Pagado" color="success" />
                
                //<h5>Fecha {pedido.pagadoEn}</h5>
              ) : (
                <Chip label="No pagado" color="error" />
               
              )}

             

            </Grid>
            <Divider />
            <Grid item mx={2} sx={{ mt: { xs: 1, md: 3 } }}>


              <Typography variant="h5" textAlign="center" gutterBottom>
                Datos de envio
              </Typography>

              <Typography mb={2}>
                <strong>Nombre:</strong> {pedido.direccionEnvio.nombre} <br />
                <strong>Direccion:</strong> {pedido.direccionEnvio.direccion},
                {pedido.direccionEnvio.ciudad}, {pedido.direccionEnvio.comuna},<br />
                <strong>Telefono:</strong> {pedido.direccionEnvio.fono}
              </Typography>

            </Grid>
            <Divider />
            <Grid item mx={2} sx={{ mt: { xs: 1, md: 3 } }}>

              <Typography variant="h5" textAlign="center" gutterBottom>
                Resumen
              </Typography>


              <Typography mb={3} >
                <strong>Subtotal:</strong> {pedido.valorItem.toFixed(2)}<br />
                <strong>IVA:</strong>  {pedido.valorIVA.toFixed(2)}<br />
                <strong>Total:</strong>  {pedido.valorTotal.toFixed(2)}
              </Typography>

            </Grid>
            <Divider />
                
            {!pedido.pagado && (
              <Grid item mx={2} sx={{ mt: { xs: 1, md: 3 } }}>

              {pendiente ? (<h5>...Cargando</h5>) : (
                <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}>
                      </PayPalButtons>
              )}
              {loadingPay && <h5>...Cargando</h5>}
              </Grid>)}



            

          
              


              


            
          </Card>
        </Grid>
      


    </Grid>
  </Box >
  );
}


