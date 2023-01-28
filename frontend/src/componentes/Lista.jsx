import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';



export const Lista = ()=>{
  return (
    <div>
    {/* <Typography
      id="basic-list-demo"
      level="body3"
      textTransform="uppercase"
      fontWeight="lg"
    >
      Ingredients
    </Typography> */}
    <List aria-labelledby="basic-list-demo">
      <ListItem>1 red onion</ListItem>
      <ListItem>2 red peppers</ListItem>
      <ListItem>120g bacon</ListItem>
    </List>
  </div>
  );
};