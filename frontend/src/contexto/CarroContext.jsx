import { createContext, useReducer } from "react";

export const CarroContext = createContext();

const initialState = {

  infoUser: localStorage.getItem("infoUser") ?
  (JSON.parse(localStorage.getItem("infoUser"))) : null,


  carro: {
    carroItems: localStorage.getItem("carroItems") ?
    JSON.parse(localStorage.getItem("carroItems")) 
    : [],
  },
};

const reducer = (state, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case "ADD_ITEM_CARRO":
      //agrega un item nuevo al carro

      const itemNuevo = action.payload;


      const itemExsite = state.carro.carroItems.find(
        item => item._id === itemNuevo._id
      );
      //itemsCarro
      const carroItems = itemExsite ?
        state.carro.carroItems.map(
          (item) => item._id === itemExsite._id ?
            itemNuevo : item) :
        [...state.carro.carroItems, itemNuevo];

        localStorage.setItem(`carroItems`, JSON.stringify(carroItems));
      //console.log(`ultimo estado: ${(JSON.stringify(carroItems))}`);
      //console.log(`ultimo estado largo: ${carroItems.length}`);
      return { ...state, carro: { ...state.carro, carroItems } };

      case "DELETE_ITEM_CARRO":{
        const carroItems = state.carro.carroItems.filter(
          (item)=> item._id !== action.payload._id
        );

        localStorage.setItem(`carroItems`, JSON.stringify(carroItems));
          return {...state, carro:{...state.carro, carroItems}};
      };

      case "SIGNIN_USER":
        return {...state, infoUser: action.payload};

      case "SIGNOUT_USER":
        return {...state, infoUser: null};


      break;

    default:
      return state;


  }
}



export const CarroProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  //value contiene el estado actual en el CONTEXT y dispatch para actualizar 
  //el estado del CONTEXT
  return <CarroContext.Provider value={value}> {props.children} </CarroContext.Provider>
};

