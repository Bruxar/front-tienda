import React from 'react';

/* Routing */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/* Layouts */
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';

/* Componentes */
import Clientes from './components/clientes/Clientes';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';


import Productos from './components/productos/Productos';
import Pedidos from './components/pedidos/Pedidos';


function App() {
  return (
    <Router>
    <>
      <Header />

      <div className='grid contenedor contenido-principal'>
        <Navegacion/>

        <main className='caja-contenido col-9'>
          <Routes>
            <Route exact path="/" Component={Clientes} />
            <Route exact path="/clientes/nuevo" Component={NuevoCliente} />
            <Route exact path="/clientes/editar/:id" Component={EditarCliente} />

            <Route exact path="/productos" Component={Productos} />

            <Route exact path="/pedidos" Component={Pedidos} />
          </Routes>
        </main>

      </div>
      
    </>
    </Router>
  )
}

export default App;
