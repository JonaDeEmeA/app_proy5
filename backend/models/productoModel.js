import mongoose from "mongoose";


const productoSchema = new mongoose.Schema(

  {
  name: {type: String, require: true, unique: true},
  txtProduct: {type: String, require: true, unique: true},
  category: {type: String, require: true},
  image:  {type: String, require: true},
  price: {type: Number, require: true},
  inStock: {type: Number, require: true},
  rating: {type: String, require: true},
  description: {type: String, require: true},

},
{
  timestamps : true
}

);

export const Producto = mongoose.model("Producto", productoSchema);