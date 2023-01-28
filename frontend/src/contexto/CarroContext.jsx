import { createContext, useReducer } from "react";

export const CarroContext = createContext();

const initialState = {
  carro: {
    carroItems: [],
  },
} ;

const reducer=(state, action)=>{
 // console.log(action.payload);
  switch (action.type) {
    case "ADD_ITEM_CARRO":
      //agrega un item nuevo al carro
      
     const itemNuevo = action.payload;
      console.log(`largo: ${state.carro.carroItems.length}`);

      const itemExsite =  state.carro.carroItems.find(
        item => item._id === itemNuevo._id 
      ) ;
        //itemsCarro
      const carroItems = itemExsite ? state.carro.carroItems.map(
        (item) => item._id === itemExsite._id ? itemNuevo : item
      ) : [...state.carro.carroItems, itemNuevo];

      console.log(`else: ${carroItems}`);

     
    return {...state, carro: {...state.carro, carroItems}}; 

   
 
    
       
  
    default: 
      return state;

      
  }
}



export const CarroProvider=(props)=>{
  const [state, dispatch] =  useReducer(reducer, initialState);
  const value = {state, dispatch};
  //value contiene el estado actual en el CONTEXT y dispatch para actualizar 
  //el estado del CONTEXT
  return <CarroContext.Provider value={value}> {props.children} </CarroContext.Provider>
};

