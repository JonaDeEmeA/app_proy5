import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './componentes/Navbar';
import {InicioView} from "./vistas/InicioView"
import { ProductoView } from './vistas/ProductoView';
import { Footer } from "./componentes/Footer"
import { CarroView } from './vistas/CarroView';
import { IngresoView } from './vistas/IngresoView';
import { DatosEnvioView } from './vistas/DatosEnvioView';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<InicioView />} />
      <Route path="/carro" element={<CarroView />} />
      <Route path="/ingreso" element={<IngresoView />} />
      <Route path="/envio" element={<DatosEnvioView />} />
      <Route path="/producto/:txtProduct" element={<ProductoView />} />
    
    </Routes>
    <Footer />
    </>
  );
}

export default App;
