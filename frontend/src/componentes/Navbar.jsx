import DiningIcon from "@mui/icons-material/Dining";
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material"
import { red } from '@mui/material/colors';



import {MuiMenu } from "./Menu"
import {TabMenu } from "./TabMenu"


export const Navbar = () => {




    

    return (
        <AppBar position="static" sx={{bgcolor: "common.black"}}  >
            
            <Toolbar  >
                <MuiMenu />
                <TabMenu />
               
                <Typography sx={{width:"100%", textAlign:{sx:"left", md:"right"}}}   variant="h6" component="div" >
                    Proyecto5_UDD - eCommerce
                </Typography>
                {/* <Stack direction="row" spacing={2} >
                    <Button color="inherit" >Btn 1</Button>
                    <Button color="inherit" >Btn 2</Button>
                    <Button color="inherit" >Btn 3</Button>
                    <Button color="inherit" >Btn 4</Button>
                </Stack>  */}
            </Toolbar>
        </AppBar>
    );
};