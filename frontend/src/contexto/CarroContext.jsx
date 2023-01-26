import { createContext, useReducer } from "react";

export const CarroContext = createContext();

const initialState = {
  carro: {
    carroItems: [],
  },
} ;

const reducer=(state, action)=>{
  switch (action.type) {
    case "ADD_ITEM_CARRO":
      //agrega un item nuevo al carro
      return{...state, 
        carro:{...state.carro, 
          carroItems:[...state.carro.carroItems, action.datos]
        },
      };
  
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

