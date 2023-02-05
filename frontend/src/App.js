import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './componentes/Navbar';
import {InicioView} from "./vistas/InicioView"
import { ProductoView } from './vistas/ProductoView';
import { Footer } from "./componentes/Footer"
import { CarroView } from './vistas/CarroView';
import { RegistroView } from './vistas/RegistroView';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<InicioView />} />
      <Route path="/carro" element={<CarroView />} />
      <Route path="/registro" element={<RegistroView />} />
      <Route path="/producto/:txtProduct" element={<ProductoView />} />
    
    </Routes>
    <Footer />
    </>
  );
}

export default App;
