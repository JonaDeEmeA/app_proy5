import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';



const pasos = [
  'Ingreso',
  'Datos de envio',
  'Generar Pedido',

  'Pago',
];

export const PasosCompra = (props)=>{

  return (
    <Box sx={{ width: '100%', }}> 
      <Stepper activeStep={props.pasos} alternativeLabel>
        {pasos.map((label) => (
          
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ) )}
        
      </Stepper>
    </Box>
  );
};