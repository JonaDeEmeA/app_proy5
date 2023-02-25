import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './componentes/Navbar';
import {InicioView} from "./vistas/InicioView"
import { ProductoView } from './vistas/ProductoView';
import { Footer } from "./componentes/Footer"
import { CarroView } from './vistas/CarroView';
import { IngresoView } from './vistas/IngresoView';
import { RegistroView } from './vistas/RegistroView';
import { DatosEnvioView } from './vistas/DatosEnvioView';
import { GenerarPedidoView } from './vistas/GenerarPedidoView';
import { PedidoView } from './vistas/PedidoView';
import { HistorialPedidoView } from './vistas/HistorialPedidoView';
import { HomeView } from './vistas/HomeView';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/productos" element={<InicioView />} />
      <Route path="/carro" element={<CarroView />} />
      <Route path="/ingreso" element={<IngresoView />} />
      <Route path="/registro" element={<RegistroView />} />
      <Route path="/envio" element={<DatosEnvioView />} />
      <Route path="/pedido" element={<GenerarPedidoView />} />
      <Route path="/pedido/:id" element={<PedidoView />} />
      <Route path="/mispedidos" element={<HistorialPedidoView />} />
      <Route path="/producto/:txtProduct" element={<ProductoView />} />
    
    </Routes>
    
    <Footer />
    </>
  );
}

export default App;
