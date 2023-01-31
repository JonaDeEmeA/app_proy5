
import { Button, Stack, Box } from "@mui/material"






export const BtnGeneral = ({nombreBtn, accion, icon, color, size, bool})=>{


    return(

        <Box sx={{
            
            alignItems:"center"
        }}>
        <Stack spacing={2} sx={{ alignItems:"center", justifyContent: "space-between"}} >
                
            <Button  endIcon={icon} color={color} onClick={()=>accion()} variant="contained" size={size} disabled={bool}>{nombreBtn} </Button>
            
        </Stack>
        </Box>
    );

};