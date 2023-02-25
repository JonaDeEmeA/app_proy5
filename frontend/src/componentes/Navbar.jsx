import DiningIcon from "@mui/icons-material/Dining";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Box } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom"

import { Carro } from "./Carro"
import { CarroContext } from "../contexto/CarroContext";


export const Navbar = () => {

    const { state, dispatch: ctxDispatch } = useContext(CarroContext);
    const { carro, infoUser } = state;
    

    const navegar = useNavigate();

    const goHome = () => {
    navegar("/");
   };
    const goIngreso = () => {
    navegar("/ingreso");
   };
    const goRegistro = () => {
    navegar("/registro");
   };
    const goMisPedidos = () => {
    navegar("/mispedidos");
   };


   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
     setAnchorEl(null);
   };

   const handleSalir = ()=>{
    ctxDispatch({type: "SIGNOUT_USER"});
    localStorage.removeItem("infoUser");
    localStorage.removeItem("direccionEnvio");
    goHome();
    //localStorage.removeItem("carroItems");
    
    
   };


    return (
        <AppBar position="static" sx={{ bgcolor: "common.black" }}  >

            <Toolbar  >

                {/*MuiMenu Pantalla Mobil */}  
                <div>
                <Button sx={{ display: { md: "none" } }}
                    color="inherit"
                    size="small"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MenuIcon />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    sx={{ display: {  md: "none" } }}
                >
                    <MenuItem onClick={goHome}>Inicio</MenuItem>
                    <MenuItem onClick={goRegistro}>Registrar</MenuItem>
                    {infoUser ? (
                        <div>
                        <Typography>
                        {infoUser.name}
                        </Typography>
                         <AccountCircleIcon /> 
                        <MenuItem onClick={handleClose}>Perfil Usuario</MenuItem>
                        <MenuItem onClick={goMisPedidos}>Mis Pedidos</MenuItem>
                        <MenuItem onClick={handleSalir}>Salir</MenuItem>
                        
                        </div>
                    ) : (
                        <MenuItem onClick={goIngreso}>Ingresar</MenuItem>
                    )}
                    
                    
                </Menu>
                </div>



                {/*TabMenu Pantallas grandes*/}    
                <Box sx={{
                    justifyContent: "start",
                    display: { xs: "none", md: "inline-flex" }}}>
                    <Button color="inherit" onClick={goHome}>Inicio</Button>
                    <Button color="inherit" onClick={goRegistro}>Registrar</Button>
                    {infoUser ? 
                    (
                        <>                                  
                        <Button    
                            color="inherit"
                            size="small"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                            {infoUser.name}
                            <AccountCircleIcon color="warning"/>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{ display: { xs: "none", md: "inline-flex" } }}
                        >
                            <MenuItem onClick={handleClose}>Perfil Usuario</MenuItem>
                            <MenuItem onClick={goMisPedidos}>Mis Pedidos</MenuItem>
                            <MenuItem onClick={handleSalir}>Salir</MenuItem>
                        </Menu> 
                        </>
                    ) : 
                    (
                        <Button onClick={goIngreso} color="inherit">Ingresar</Button>
                    )}
                    
                    


                </Box>






                {carro.carroItems.length > 0 && (
                    <Carro />
                )}



                <Typography sx={{ width: "100%", textAlign: { sx: "left", md: "right" } }} variant="h6" component="div" >
                    Proyecto5_UDD - eCommerce
                </Typography>

            </Toolbar>
        </AppBar>
    );
};



