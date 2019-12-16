import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
// redux
import {useDispatch} from 'react-redux';
import {eliminarProductoAction} from '../actions/productosActions'
const Producto = ({producto}) => {

    const dispatch = useDispatch()
    const confirmarEliminarProducto = (id) => {
        // Confirmacion del usuario por sweetAlert
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                dispatch(eliminarProductoAction(id))
                Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
                )
            }
          })
      
    }
    return (
        <tr>
            <td>{producto.nombre}</td>
            <td><span className="font-weight-bold">$ {producto.precio}</span></td>
            <td className="acciones">
                <Link to={`/productos/editar/${producto.id}`} 
                className="btn btn-primary mr-2">
                    Editar
                </Link>
                <button className="btn btn-danger"
                onClick={()=>confirmarEliminarProducto(producto.id)}>Eliminar</button>
            </td>
        </tr>    
    );
}
export default Producto;