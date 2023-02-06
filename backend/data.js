import bcrypt from 'bcryptjs';
//const bcrypt = require("bcryptjs");
const data = {
  users: [
    {
      name: 'Erbin',
      email: 'erbinmvg@gmail.com',
      password: bcrypt.hashSync('123456')
    }

  ],
  producto: [
    {
      _id: "1",
      name: "100% Mani",
      txtProduct: "manteqilla-100-mani",
      category: "Mantequillas",
      image: "https://jonadeemea.github.io/Kymani_landing/img/100mani.jpg",
      price: 6000,
      inStock: 2,
      rating: 5,
      description: "Mantequilla de mani 100% maní, alto aporte proteico para regenerar masa muscular 💪🏻 🔥"
    },
    {
      _id: "2",
      name: "Chip chocolate",
      txtProduct: "manteqilla-chip-chocolate",
      category: "Mantequillas",
      image: "https://jonadeemea.github.io/Kymani_landing/img/chip-choco.jpg",
      price: 6000,
      inStock: 20,
      rating: 4.5,
      description: "Mantequilla de maní con chip de chocolate, alto aporte energético del bueno🔥"
    },
    {
      _id: "3",
      name: "100% Avellana",
      txtProduct: "manteqilla-100-avellana",
      category: "Mantequillas",
      image: "https://jonadeemea.github.io/Kymani_landing/img/avellana.jpg",
      price: 6000,
      inStock: 20,
      rating: 4.5,
      description: "Mantequilla de avellana, alto aporte de minerales🌱"
    },
    {
      _id: "4",
      name: "Orégano merquén",
      txtProduct: "manteqilla-oregano-merquen",
      category: "Mantequillas",
      image: "https://jonadeemea.github.io/Kymani_landing/img/merquen-oregano.jpg",
      price: 6000,
      inStock: 3,
      rating: 4.5,
      description: "Mantequilla de maní + merquén y orégano, alto aporte energético del bueno🔥"
    },
    {
      _id: "5",
      name: "Mani Coco",
      txtProduct: "manteqilla-mani-coco",
      category: "Mantequillas",
      image: "https://jonadeemea.github.io/Kymani_landing/img/mani-coco.jpg",
      price: 6000,
      inStock: 20,
      rating: 4.5,
      description: "Mantequilla de maní con coco rallado, alto aporte energético del bueno🔥"
    },
    {
      _id: "6",
      name: "Pack 5 variedades",
      txtProduct: "manteqilla-pack",
      category: "Mantequillas",
      image: "https://jonadeemea.github.io/Kymani_landing/img/mani-kit.jpg",
      price: 25000,
      inStock: 0,
      rating: 4.5,
      description: "Pack variedades de mantequillas"
    }
  ]
};


export default data;
//module.exports = data;