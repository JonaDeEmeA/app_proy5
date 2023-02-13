import mongoose from "mongoose";


const productoSchema = new mongoose.Schema(

  {
  name: {type: String, required: true, unique: true},
  txtProduct: {type: String, required: true, unique: true},
  category: {type: String, required: true},
  image:  {type: String, required: true},
  price: {type: Number, required: true},
  inStock: {type: Number, required: true},
  rating: {type: String, required: true},
  description: {type: String, required: true},

},
{
  timestamps : true
}

);

export const Producto = mongoose.model("Producto", productoSchema);