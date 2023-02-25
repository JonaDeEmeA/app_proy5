
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FeedIcon from '@mui/icons-material/Feed';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography } from "@mui/material";
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

  const handleDelPedido = async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const { data } = await axios.delete(
        "/api/pedidos/propio",

        { headers: { authorization: `Bearer ${infoUser.token}`, idUsuario: infoUser._id } }
      );
      
      dispatch({ type: "FETCH_SUCCESS", payload: data });

    } catch (error) {
      dispatch({
        type: "FETCH_FAIL",
        payload: getError(error)
      })
    }

  };

  useEffect(() => {

    

    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          "/api/pedidos/propio",

          { headers: { authorization: `Bearer ${infoUser.token}`, idUsuario: infoUser._id } }
        );
        
        dispatch({ type: "FETCH_SUCCESS", payload: data });

      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error)
        })
      }

    };


    
    fetchData();

  }, [infoUser])

  console.log(pedidos);
  return (
    <>
      <Box display="flex" flexDirection='column' justifyContent="center" alignItems='center' sx={{ minHeight: "86.6vh" }}>
        <Typography  variant="h3" gutterBottom>Historial Pedidos</Typography>
        {cargando ? (
          <h5>...Cargando</h5>
        ) : error ? (
          alert(error)
        ) : (

          <TableContainer component={Paper} sx={{ minWidth: "90%", maxWidth: "70%" }}>
            <Table sx={{ minWidth: 650, }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>N° PEDIDO</TableCell>

                  <TableCell align="center">TOTAL</TableCell>
                  <TableCell align="center">PAGO</TableCell>
                  <TableCell align="center">DETALLE / BORRAR</TableCell>
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
                    {/* <TableCell align="center">{pedido.createdAt.substring(0,10)}</TableCell> */}
                    <TableCell align="center">${pedido.valorTotal}</TableCell>
                    <TableCell align="center">{pedido.pagado ? pedido.pagadoEn.substring(0, 10) : "No"}</TableCell>
                    <TableCell align="center" width="300px" display="flex"
                      sx={{ width: { sx: "100px", md: "200px" }, }}>
                      <IconButton
                        sx={{mr:2 }}
                        color="warning"
                        onClick={() => { navigate(`/pedido/${pedido._id}`) }}
                        aria-label="delete">
                        <FeedIcon />
                      </IconButton>
                      <IconButton
                        sx={{ml:2 }}
                        color="error"
                        onClick={() => { navigate(`/pedido/${pedido._id}`) }}
                        aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
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