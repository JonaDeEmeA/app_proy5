import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
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

  const navegar = useNavigate();

	 const goCarro = () => {
	 navegar("/carro");
	}

  const {state} = useContext(CarroContext);
  const { carro } = state; 
  const total = carro.carroItems.reduce((a, c) => a + c.cantidad, 0);
  
  return (
    <IconButton onClick={goCarro} aria-label="cart">
      <StyledBadge badgeContent={total} color="error">
        <ShoppingCartIcon  color="warning" />
      </StyledBadge>
    </IconButton>
  );
}