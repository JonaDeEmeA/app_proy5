
import Calificacion from "./Calificacion"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from "axios";
import { useContext } from "react";
import { CarroContext } from "../contexto/CarroContext";



export default function TarjetaProducto(props) {

  const { state, dispatch: ctxDispatch } = useContext(CarroContext);
  const { carro: { carroItems } } = state;
  
  
  const handlerAddToCarro = async (item) =>{
    console.log(`el stock de ${props.item.name} es ${props.item.inStock}`);
    const itemExsite = carroItems.find(e => e._id === item._id) ; 
    const cantidad = itemExsite ? itemExsite.cantidad + 1 : 1;
    
    
    try {
       const {data} = await axios.get(`/api/productos/${item._id}`);
       console.log(`desde axios ${data.inStock} y cantidad = ${cantidad}`);
       if (data.inStock < cantidad) {
        console.log("AAAAA");
        window.alert("Lo sentimos. El producto no tiene stock");
        return;
      };
    } catch (error) {
      console.log("el error :" + error);
    }
   

   

    console.log(cantidad);
     ctxDispatch({
      type: "ADD_ITEM_CARRO",
      payload: {...item, cantidad},
     });
     
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea txtproducto={props.txtProducto} onClick={props.accion}>
        <CardMedia
          component="img"
          height="250"
          image={props.imagen}
          alt={props.txtProducto}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.producto}
          </Typography>
          {/* <Calificacion numVistas={props.numVistas}/> */}
          <Typography variant="body2" color="text.secondary">
            $ {props.valor}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      {props.item.inStock === 0 ? (
          <Button size="small" 
          color="success" 
          variant="contained" 
          disabled >
            Sin Stock
          </Button>
        ) : (
          <Button size="small" 
          color="success" 
          variant="contained" 
          startIcon={<ShoppingCartIcon />} 
          onClick={()=>handlerAddToCarro(props.item)} >
            Agregar
          </Button>
        )}
       
      </CardActions>
    </Card>
  );
}

/*
 {props.item.inStock === 0 ? (
          <Button size="small" 
          color="success" 
          variant="contained"  >
            Sin Stock
          </Button>
        ) : (
          <Button size="small" 
          color="success" 
          variant="contained" 
          startIcon={<ShoppingCartIcon />} 
          onClick={()=>handlerAddToCarro(props.item)} >
            Agregar
          </Button>
        )}
*/