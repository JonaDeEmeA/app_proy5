import { PasosCompra } from "../componentes/PasosCompra";
import { Grid, Box, Button, TextField, Typography, ListItem, List, Card } from "@mui/material";

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useContext, useReducer } from "react";
import { CarroContext } from "../contexto/CarroContext";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";


const reducer = (state, action) => {

  switch (action.type) {
    case "CREATE_PEDIDO":
      return { ...state, cargando: true };
    case "CREATE_PEDIDO_SUCCESS":
      return { ...state, cargando: false }
    case "CREATE_PEDIDO_FAIL":
      return { ...state, cargando: false }
    default:
      return state;
  }
};


export const GenerarPedidoView = () => {

  const navigate = useNavigate();

  const [{ cargando }, dispatch] = useReducer(reducer, {
    cargando: false,
  })
  const { state, dispatch: ctxDispatch } = useContext(CarroContext);
  const { carro, infoUser } = state;



  const redondeo2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  carro.valorItem = redondeo2(
    carro.carroItems.reduce((a, c) => a + c.cantidad * c.price, 0)
  );
  carro.valorEnvio = carro.valorItem > 100 ? redondeo2(0) : redondeo2(10);
  carro.valorIVA = redondeo2(0.19 * carro.valorItem);
  carro.valorTotal = carro.valorItem + carro.valorEnvio + carro.valorIVA;

  const handlerConfirmarPedido = async () => {

    try {

      dispatch({ type: "CREATE_PEDIDO" });


      const { data } = await Axios.post("/api/pedidos",
        {
          itemsPedido: carro.carroItems,
          direccionEnvio: carro.direccionEnvio,
          valorItem: carro.valorItem,
          valorEnvio: carro.valorEnvio,
          valorIVA: carro.valorIVA,
          valorTotal: carro.valorTotal,
          idUsuario: infoUser._id


        },
        {
          headers: {
            authorization: `Bearer ${infoUser.token}`,
          },
        }
      );
      console.log(infoUser._id);

      ctxDispatch({ type: "RESET_CARRO" });
      dispatch({ type: "CREATE_PEDIDO_SUCCESS" });
      localStorage.removeItem("carroItems");
      navigate(`/pedido/${data.pedido._id}`)

    } catch (error) {
      dispatch({ type: "CREATE_PEDIDO_FAIL" });
      alert(error)

    }

  }

  const goCarro = () => {
    navigate("/carro")

  }

  return (

    <Box display="flex" flexDirection="column" alignItems='center' justifyContent="space-evenly" sx={{ minHeight: "87vh" }}>
      <PasosCompra pasos={2} />
      <Grid container
        sx={{
          maxWidth: { sx: "90%", md: "70%" },
          justifyContent: { xs: "center", md: "space-evenly" }
        }}>


        <Grid item xs={10} md={8} sx={{ mb: { xs: 2, md: 0 }, }}>
          <Card sx={{ height: "100%", borderRadius: 2 }} >
            <List>
              {carro.carroItems.map(item => (
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
            <Grid item mx={2} sx={{ mt: { xs: 1, md: 6 } }}>


              <Typography variant="h5" textAlign="center" gutterBottom>
                Datos de envio
              </Typography>

              <Typography mb={2}>
                <strong>Nombre:</strong> {carro.direccionEnvio.nombre} <br />
                <strong>Direccion:</strong> {carro.direccionEnvio.direccion},
                {carro.direccionEnvio.ciudad}, {carro.direccionEnvio.comuna},<br />
                <strong>Telefono:</strong> {carro.direccionEnvio.fono}
              </Typography>

            </Grid>
            <Divider />
            <Grid item mx={2} sx={{ mt: { xs: 1, md: 4 } }}>

              <Typography variant="h5" textAlign="center" gutterBottom>
                Resumen
              </Typography>


              <Typography mb={3} >
                <strong>Subtotal:</strong> {carro.valorItem.toFixed(2)}<br />
                <strong>IVA:</strong>  {carro.valorIVA.toFixed(2)}<br />
                <strong>Total:</strong>  {carro.valorTotal.toFixed(2)}
              </Typography>


              <Grid container mb={3} justifyContent="space-evenly">
                <Grid item xs={5} md={12} mb={2}>
                  <Button
                    fullWidth
                    type="button"
                    disabled={carro.carroItems.length === 0}
                    onClick={handlerConfirmarPedido}
                    variant="contained" color="success">
                    Confirmar
                  </Button>
                </Grid>
                <Grid item xs={5} md={12}>
                  <Button
                    fullWidth
                    type="button"
                    disabled={carro.carroItems.length === 0}
                    onClick={goCarro}
                    variant="contained" color="success">
                    Editar Pedido
                  </Button>
                </Grid>
              </Grid>
              {cargando && "cargando..."}


            </Grid>
          </Card>
        </Grid>
      </Grid>


    </Box >
  )
}