import React, { useEffect, useState } from 'react';

//Importar cliente axios
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';

import {Link } from 'react-router-dom';

function Clientes() {

    const [clientes, guardarClientes] = useState({}); //State del componente [state, actualizarState]

    //Query a la API
    const consultarAPI = async () => {
        const clientesConsulta = await clienteAxios.get('/clientes');

        //Colocar el resultado en el state
        guardarClientes(clientesConsulta.data);
    }

    useEffect(() => {
        consultarAPI();
    }, [clientes]);

    return (
        <>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className='btn btn-verde nvo-cliente'>
                <i className='fas fa-plus-circle'></i>
                Nuevo Cliente
            </Link>

            <ul className='listado-clientes'>
                {clientes.length > 0 ? (
                    clientes.map(cliente => (
                        <Cliente
                            key={cliente._id}
                            cliente={cliente}
                        />
                    ))
                ) : (
                    <li>No hay clientes</li>
                )}
            </ul>
        </>
    );
}

export default Clientes;