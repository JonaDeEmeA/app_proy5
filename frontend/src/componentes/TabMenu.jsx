import { useNavigate } from "react-router-dom";
import { Box,Button} from '@mui/material';





export const TabMenu=()=> {
  
  // const navegar = useNavigate();

	// const goHome = () => {
	// navegar("/");
	// }
  
  
    return (
      <Box sx={{  
      justifyContent: "start",
      display:{xs:"none", md:"inline-flex"} }}>
        
          {/* <Button color="inherit" onClick={goHome}>Inicio</Button> */}
          <Button color="inherit">Inicio</Button>
          <Button color="inherit">Registrar</Button>
          <Button color="inherit">Ingresar</Button>
         
        
      </Box>
    );

}