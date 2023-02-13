
import { Button, IconButton, Menu, MenuItem, Typography, Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useState } from "react";
import { useNavigate } from "react-router-dom";




export const MuiMenu = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

   const navegar = useNavigate();

	 const goHome = () => {
		navegar("/");
	 }

  return (

    <div>
      <Button sx={{display:{md:"none"}}}
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
      >
        <MenuItem onClick={goHome}>Inicio</MenuItem>
       
        <MenuItem onClick={handleClose}>Ingresarr</MenuItem>
        <MenuItem onClick={handleClose}>Registrar</MenuItem>
      </Menu>
    </div>
  );
}