import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './componentes/Navbar';
import {InicioView} from "./vistas/InicioView"
import { ProductoView } from './vistas/ProductoView';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<InicioView />} />
      <Route path="/producto/:txtProduct" element={<ProductoView />} />
    
    </Routes>
    </>
  );
}

export default App;
