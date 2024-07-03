import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function EditarCliente(props) {
 
    //Obtener el ID
    const { id } = useParams();
    let navigate = useNavigate();
    console.log(id);

    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
        //Actualizar state
        datosCliente(clienteConsulta.data);
    };

    //Query a la API
    useEffect(() => {
        consultarAPI();
    }, []);

    //Leer los datos del formulario
    const actualizarState = e => {
        datosCliente({
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

    //Envia peticion x axios para actualizar cliente
    const actualizarCliente = e => {
        e.preventDefault();

        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
        .then(res => {
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
                    'Correcto',
                    'Se actualizó correctamente',
                    'success'
                )
            }
            //Redireccionar
            navigate('/', {replace: true})
        })
    };

    return (
        <>
            <h2>Editar Cliente</h2>

            <form onSubmit={actualizarCliente}>
                <legend>Llena todos los campos</legend>

                <div className='campo'>
                    <label>Nombre:</label>
                    <input type='text'
                        placeholder='Nombre Cliente'
                        name='nombre'
                        id='nombre' 
                        onChange={actualizarState}
                        value= {cliente.nombre}/>
                        
                </div>

                <div className='campo'>
                    <label>Apellido:</label>
                    <input type='text'
                        placeholder='Apellido Cliente'
                        name='apellido'
                        id='apellido' 
                        onChange={actualizarState}
                        value= {cliente.apellido}/>
                </div>

                <div className='campo'>
                    <label>Empresa:</label>
                    <input type='text'
                        placeholder='Empresa Cliente'
                        name='empresa'
                        id='empresa' 
                        onChange={actualizarState}
                        value= {cliente.empresa}/>
                </div>

                <div className='campo'>
                    <label>Email:</label>
                    <input type='email'
                        placeholder='Email Cliente'
                        name='email'
                        id='email' 
                        onChange={actualizarState}
                        value= {cliente.email}/>
                </div>

                <div className='campo'>
                    <label>Teléfono:</label>
                    <input type='tel'
                        placeholder='Teléfono Cliente'
                        name='telefono'
                        id='telefono' 
                        onChange={actualizarState}
                        value= {cliente.telefono}/>
                </div>

                <div className='enviar'>
                    <input type='submit'
                        className='btn btn-azul'
                        value='Guardar Cambios' 
                        disabled={ validarCliente() }/>
                </div>
            </form>

        </>
    );
}

//HOC, función que toma un componente y retorna un nuevo componente con propiedades adicionales
export default EditarCliente;