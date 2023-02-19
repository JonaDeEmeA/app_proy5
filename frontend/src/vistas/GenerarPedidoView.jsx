import { PasosCompra } from "../componentes/PasosCompra";
import { Grid, Box, Button, TextField, Typography, ListItem, List, Card } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { useContext, useReducer } from "react";
import { CarroContext } from "../contexto/CarroContext";
import { Link, useNavigate } from "react-router-dom";
import  Axios  from "axios";


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
}


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
      //console.log(infoUser.name);
      
      const { data } = await Axios.post("/api/pedidos",
        {
          itemsPedido: carro.carroItems,
          direccionEnvio: carro.direccionEnvio,
          valorItem: carro.valorItem,
          valorEnvio: carro.valorEnvio,
          valorIVA: carro.valorIVA,
          valorTotal: carro.valorTotal,
          //user: infoUser.name
          
        } ,
        {
          headers: {
            authorization: `Bearer ${infoUser.token}`,
          },
        }
        
      );

      
      ctxDispatch({ type: "RESET_CARRO" });
      dispatch({ type: "CREATE_PEDIDO_SUCCESS" });
      localStorage.removeItem("carroItems");
      navigate(`/pedido/${data.pedido._id}`)

    } catch (error) {
      dispatch({ type: "CREATE_PEDIDO_FAIL" });
      alert(error)
       
    }
    
    

    
    //navigate("/pago");
  }

  return (

    <Box display="flex" flexDirection='column' justifyContent="center" alignItems='center' sx={{ minHeight: "86.5vh" }}>
      <PasosCompra pasos={2} />
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
                  <strong>Nombre:</strong> {carro.direccionEnvio.nombre} <br />
                  <strong>Direccion:</strong> {carro.direccionEnvio.direccion},
                  {carro.direccionEnvio.ciudad}, {carro.direccionEnvio.comuna},



                </Typography>
                <Typography>
                  <strong>Telefono:</strong> {carro.direccionEnvio.fono} <br />

                </Typography>
              </Card>
            </ListItem>
            <ListItem >
              <Card sx={{ width: "100%" }}>
                <Typography variant="h5" gutterBottom>
                  Items
                </Typography>
                <List>

                  {carro.carroItems.map(item => (


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
        <Grid item xs={12} md={4}>
          <Card>
            <Typography variant="h5" gutterBottom>
              Resumen
            </Typography>
            <List>
              <ListItem>
                <Typography variant="h5" gutterBottom>
                  <span>Productos {carro.valorItem.toFixed(2)}</span>
                </Typography>

              </ListItem>
              <ListItem>
                <span>Envio{carro.valorEnvio.toFixed(2)}</span>
              </ListItem>
              <ListItem>
                <span>IVA{carro.valorIVA.toFixed(2)}</span>

              </ListItem>
              <ListItem>
                <span>Total{carro.valorTotal.toFixed(2)}</span>

              </ListItem>
              <ListItem>
                <Button
                  type="button"
                  disabled={carro.carroItems.length === 0}
                  onClick={handlerConfirmarPedido}
                  variant="contained" color="success">
                  Confirmar Pedido
                </Button>
                {/* {cargando && "cargando..."} */}
              </ListItem>
            </List>
          </Card>

        </Grid>


      </Grid>
    </Box >
  )
}