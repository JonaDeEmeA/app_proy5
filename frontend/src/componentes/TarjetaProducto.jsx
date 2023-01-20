
import Calificacion from "./Calificacion"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, CardActionArea, CardActions } from '@mui/material';



export default function TarjetaProducto(props) {

  


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
          <Calificacion />
          <Typography variant="body2" color="text.secondary">
            {props.valor}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" variant="contained" startIcon={<ShoppingCartIcon />} >
          Agregar
        </Button>
      </CardActions>
    </Card>
  );
}