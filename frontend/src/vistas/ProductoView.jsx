import { useParams } from "react-router-dom"


export const ProductoView = ()=>{

  const params = useParams();
  const {txtProduct} = params;

  return (
    <h1>{txtProduct}</h1>
  )

}