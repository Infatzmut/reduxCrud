import React, { useEffect , useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {obtenerProductoEditarAction, editarProductoAction } from '../actions/productosActions';

const EditarProducto = ({ match }) => {

    // Crear los refs
    const nombreRef = useRef('');
    const precioRef = useRef('');
    const dispatch = useDispatch();

    const editarProducto = producto => dispatch(editarProductoAction(producto))
    // Obtener el id a editar 
    const { id } = match.params;
    useEffect(()=> {
        dispatch(obtenerProductoEditarAction(id))
    },[dispatch, id])
    // Acceder al state
    const producto = useSelector(state => state.productos.producto)
    const error = useSelector(state => state.productos.error)
    // Cuando carga la API
    if(!producto) return <div>Cargando...</div>

    const submitEditarProducto = e => {
        e.preventDefault()
        // validar el formulario
        if(nombreRef.current.value === '' || precioRef.current.value ===''){
            return;
        }
        
        // no hay error
        editarProducto({
            id,
            nombre : nombreRef.current.value,
            precio: precioRef.current.value
        });
        // guardar los cambios 

        // redireccionar
    }
    return (
        <React.Fragment>
             {error ? 
             <div className="font-weight-bold alert alert-danger text-center mt-4">
                     Hubo un error , intenta denuevo
            </div>
             : 
             <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Editar Producto</h2>
                            <form onSubmit={submitEditarProducto}>
                                <div className="form-group">
                                    <label>Titulo</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Titulo"
                                        defaultValue = {producto.nombre}
                                        ref = {nombreRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio del Producto</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Precio" 
                                        defaultValue = {producto.precio}
                                        ref= {precioRef}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar Cambios</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
            }
    </React.Fragment>
    )
}

export default EditarProducto;