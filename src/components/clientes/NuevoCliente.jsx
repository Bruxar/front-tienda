import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function NuevoCliente(history) {

    let navigate = useNavigate();

    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    //Leer los datos del formulario
    const actualizarState = e => {
        guardarCliente({
            //Obtener copia del state actual y concatenar a nuevo valor
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    //Validar el formulario
    const validarCliente = () => {
        //Destructuring
        const { nombre, apellido, empresa, email, telefono } = cliente;

        //Revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        return valido;
    }

    //Añade en la rest api un cliente nuevo
    const agregarCliente = e => {
        e.preventDefault();

        //Enviar la petición por axios
        clienteAxios.post('/clientes', cliente)
         .then(res => {
            //Validar si hay errores de mongo
            if(res.data.code === 11000){
                Swal.fire({
                    type: 'Error',
                    title: 'Hubo un error',
                    text: 'Ese cliente ya está registrado'
                }
                )
            }else{
                console.log(res.data);

                Swal.fire(
                    'Se agregó el cliente',
                    res.data.mensaje,
                    'success'
                )
            }
            //Redireccionar
            navigate('/', {replace: true})
         });
    }

    return (
        <>
            <h2>Nuevo Cliente</h2>

            <form onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>

                <div className='campo'>
                    <label>Nombre:</label>
                    <input type='text'
                        placeholder='Nombre Cliente'
                        name='nombre'
                        id='nombre' 
                        onChange={actualizarState}/>
                        
                </div>

                <div className='campo'>
                    <label>Apellido:</label>
                    <input type='text'
                        placeholder='Apellido Cliente'
                        name='apellido'
                        id='apellido' 
                        onChange={actualizarState}/>
                </div>

                <div className='campo'>
                    <label>Empresa:</label>
                    <input type='text'
                        placeholder='Empresa Cliente'
                        name='empresa'
                        id='empresa' 
                        onChange={actualizarState}/>
                </div>

                <div className='campo'>
                    <label>Email:</label>
                    <input type='email'
                        placeholder='Email Cliente'
                        name='email'
                        id='email' 
                        onChange={actualizarState}/>
                </div>

                <div className='campo'>
                    <label>Teléfono:</label>
                    <input type='tel'
                        placeholder='Teléfono Cliente'
                        name='telefono'
                        id='telefono' 
                        onChange={actualizarState}/>
                </div>

                <div className='enviar'>
                    <input type='submit'
                        className='btn btn-azul'
                        value='Agregar Cliente' 
                        disabled={ validarCliente() }/>
                </div>
            </form>

        </>
    );
}

//HOC, función que toma un componente y retorna un nuevo componente con propiedades adicionales
export default NuevoCliente;