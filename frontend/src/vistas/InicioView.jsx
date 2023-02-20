
// import data from "../data/data"
import axios from "axios";
import { Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TarjetaProducto from "../componentes/TarjetaProducto";
import { useState, useEffect, useReducer } from "react";
import logger from "use-reducer-logger";



const reducer = (state, action) => {
  switch (action.type) {
    case "PETICION_SOLICITUD":
      return { ...state, loading: true };
    case "PETICION_EXISTOSO":
      return { ...state, productos: action.payload, loading: false };
    case "PETICION_FALLO":
      return { ...state, loading: false, error: action.payload };


    default:
      return state;
  };
};



export const InicioView = () => {

  const [{ loading, error, productos }, dispatch] = useReducer(logger(reducer), {
    productos: [],
    loading: true,
    error: ""
  });

  //const [producto, setProducto] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "PETICION_SOLICITUD" });
      try {
        const respuesta = await axios.get("/api/productos");
        dispatch({ type: "PETICION_EXISTOSO", payload: respuesta.data });

      } catch (err) {
        dispatch({ type: "PETICION_FALLO", payload: err.message });
      }

      //setProducto(respuesta.data)
    };
    fetchData();
  }, []);

  const navegar = useNavigate();
  const goNavegar = (e) => {

    let atributo = e.currentTarget.getAttribute("txtproducto");
    //console.log(atributo);
    navegar(`producto/${atributo}`)

  }

  return (
    <>


      <Box component="main" className="contenedor"
        sx={{
          display: 'flex',
        }} >
        <Grid container sx={{ justifyContent: 'space-around' }} >
          {loading ? (<div>Cargando...</div>) :
            error ? (<div>{error}</div>) : (

              productos.productos.map(tarjeta => (
                <Grid item m={2} key={tarjeta.txtProduct}  >
                  <TarjetaProducto
                    item={tarjeta}
                    stock={tarjeta.inStock}
                    txtProducto={tarjeta.txtProduct}
                    accion={goNavegar}
                    valor={tarjeta.price}
                    producto={tarjeta.name}
                    imagen={tarjeta.image}
                  />
                </Grid>
              ))
            )}


        </Grid>
      </Box>

    </>
  );

};
