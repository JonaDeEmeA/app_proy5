import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from "react";
import { CarroContext } from "../contexto/CarroContext";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export const Carro=()=> {

  const {state} = useContext(CarroContext);
  const { carro } = state; 
  const total = carro.carroItems.length;
  
  return (
    <IconButton  aria-label="cart">
      <StyledBadge badgeContent={total} color="error">
        <ShoppingCartIcon  color="warning" />
      </StyledBadge>
    </IconButton>
  );
}