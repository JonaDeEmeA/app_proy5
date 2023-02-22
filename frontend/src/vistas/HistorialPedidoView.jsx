
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Box, Button, TextField, Typography, ListItem, List, Card } from "@mui/material";
import { useContext, useEffect, useReducer } from 'react';
import { CarroContext } from '../contexto/CarroContext';
import { useNavigate } from 'react-router-dom';
import { getError } from '../utils';
import axios from 'axios';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const reducer = (state, action) => {

  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, cargando: true };
    case "FETCH_SUCCESS":
      return { ...state, pedidos: action.payload, cargando: false };
    case "FETCH_FAIL":
      return { ...state, cargando: false, error: action.payload };


    default:
      return state;
  }
}

export const HistorialPedidoView = () => {

  const { state } = useContext(CarroContext);
  const { infoUser } = state;
  const navigate = useNavigate();

  const [{ cargando, error, pedidos }, dispatch] = useReducer(reducer, {
    cargando: true,
    error: ""
  });
  

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          "/api/pedidos/propio",
          { headers: { authorization: `Bearer ${infoUser.token}` } }
        );
        
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error)
        })
      }
      
    };
    console.log(`pedidos : ${infoUser._id}`);
    fetchData();
  }, [infoUser])

  
  return (
    <>
     <Box display="flex" flexDirection= 'column' justifyContent="center" alignItems='center' sx={{ minHeight: "86.6vh" }}>
      <h1>Historial Pedidos</h1>
      {cargando ? (
        <h5>...Cargando</h5>
      ) : error ? (
        alert(error)
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>N° PEDIDO</TableCell>
                <TableCell align="right">FECHA</TableCell>
                <TableCell align="right">TOTAL</TableCell>
                <TableCell align="right">PAGO</TableCell>
                <TableCell align="right">ENVIO</TableCell>
                <TableCell align="right">ACCION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pedidos.map((pedido) => (
                <TableRow
                  key={pedido._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {pedido._id}
                  </TableCell>
                  <TableCell align="right">{pedido.createdAt.substring(0,10)}</TableCell>
                  <TableCell align="right">{pedido.valorTotal.toFixed(2)}</TableCell>
                  <TableCell align="right">{pedido.pagado ? pedido.pagadoEn.substring(0,10) : "No"}</TableCell>
                  <TableCell align="right">{pedido.enviado ? pedido.enviadoEn.substring(0,10) : "No"}</TableCell>
                  <TableCell align="right">
                  <Button
                  type="button"
                  // disabled={carro.carroItems.length === 0}
                  onClick={()=>{navigate(`/pedido/${pedido._id}`)}}
                  variant="contained" color="success">
                  Detalles
                </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      </Box>
    </>
  )
}