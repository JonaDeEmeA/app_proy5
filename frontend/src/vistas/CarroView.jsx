import { useContext } from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Box, Typography, Button, createTheme } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';

import { BtnGeneral } from '../componentes/BtnGeneral';


import { CarroContext } from "../contexto/CarroContext";
//import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";

export const CarroView = () => {

  const { state, dispatch: ctxDispatch } = useContext(CarroContext);
  const { carro: { carroItems } } = state;

  return (
    <div>
      {/* <Helmet>
        <title>Carro de Compras</title>
       
      </Helmet> */}
      <h2>Carro de Compras</h2>

      <Box display="flex" justifyContent="center" alignItems='flex-start' sx={{ height: "94vh" }}>

        <Grid width="80%" container justifyContent="center"
          sx={{ bgcolor: "success.main" }} >


          <Grid item xs={12} md={5} sx={{ bgcolor: "primary.main", }}>
            {carroItems.length === 0 ? (
              console.log("carro vacio")
            ) :
              (
                <List>

                  {carroItems.map(item => (
                    <ListItem key={item._id}>

                      <Grid container >

                        <Grid item xs={3} >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="thumbnail-img">
                          </img>
                        </Grid>
                        {/* sx={{ xs:{direction:"column"}, md:{direction:"row"} }} */}
                        <Grid item xs={9}  my={1} display="flex" justifyContent= 'center'  >
                          <Grid container 
                          alignItems= 'center' 
                           >
                            <Grid item xs={12} lg={4} textAlign= 'center' mb={1}  >
                              <Link to={`/producto/${item.txtProduct}`} > {item.name} </Link>
                            </Grid>

                            <Grid item xs={12} lg={8} display="flex" 
                            justifyContent={{xs:"center", md:"space-evenly"}}
                            
                            
                             alignItems= 'center' >
                              <IconButton aria-label="remove" disabled={item.cantidad === 1}>
                                <RemoveCircleIcon />{" "}
                              </IconButton>
                              <span>{item.cantidad}</span>{" "}
                              <IconButton aria-label="add" disabled={item.cantidad === item.inStock}>
                                <AddCircleIcon />
                              </IconButton>
                              ${item.price}
                              <IconButton aria-label="erase">
                                <DeleteIcon />
                              </IconButton>
                            </Grid>

                          </Grid>
                        </Grid>

                      </Grid>
                    </ListItem>
                  ))}

                </List>
              )}

          </Grid>
          <Grid item xs={12} md={3} ml={{xs:0, md:5}} sx={{ bgcolor: "error.main" }} >

            <Card   >
              <CardContent sx={{textAlign: 'center'}} >
                <h3 >
                  SubTotal ({carroItems.reduce((a, c) => a + c.cantidad, 0)}{" "}
                  items) : ${carroItems.reduce((a, c) => a + c.price * c.cantidad, 0)}
                </h3>

                <BtnGeneral color="warning" nombreBtn="ir a Pagar" size="small" />
              </CardContent>

            </Card>

          </Grid>


        </Grid>

      </Box>
    </div>
  )
}