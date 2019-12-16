import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITOSA,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_FRACASO
} from '../types';
import clienteAxios from '../config/axios';

// crear nuevo producto - funcion principal 

export function crearNuevoProductoAction(producto){
    return (dispatch) => {
        dispatch(nuevoProducto());

        // insertar en la API
        clienteAxios.post('/productos',producto)
        .then(response => {
            dispatch(agregarProductoExito(producto))
        })
        .catch(error => {
            dispatch(agregarProductoError(error))
        })

        
    }
}

export const nuevoProducto = () => ({
    type: AGREGAR_PRODUCTO
})

export const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

export const agregarProductoError = (error) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: error
})

// Obtener listado de productos (consultar API)
export function obtenerProductosAction(productos){
    return dispatch => {
        dispatch(obtenerProductosComienzo())

        // Consultar la API
        clienteAxios.get('/productos')
        .then(response => {
            dispatch(descargaExitosa(response.data))
        })
        .catch(error =>{ 
            dispatch(descargaFallida())
        })
    }
}

export const obtenerProductosComienzo = () =>{
    return {
        type: COMENZAR_DESCARGA_PRODUCTOS
    }
}

export const descargaExitosa = (productos) => {
    return {
        type: DESCARGA_PRODUCTOS_EXITOSA,
        payload: productos
    }
}

export const descargaFallida = () => {
    return {
        type: DESCARGA_PRODUCTOS_ERROR
    }
}

// Funcion para eliminar un producto en especifico

export function eliminarProductoAction(id){
    return (dispatch) => {
        dispatch(obtenerProductoEliminar());

        // Eliminar en la API
        clienteAxios.delete(`/productos/${id}`)
        .then(response => {
            dispatch(elminarProductoExito(id))
        })
        .catch(error => {
            console.log(error);
            dispatch(elimnarProductoError())
            
        })
    }  
}

export const obtenerProductoEliminar = () => ({
    type: OBTENER_PRODUCTO_ELIMINAR
})

export const elminarProductoExito = (id) => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: id
})

export const elimnarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR
})

// funcion para editar producto
export function obtenerProductoEditarAction(id){
    return dispatch => {
        dispatch(obtenerProductoAction())

        // Obtener Producto de la API
        clienteAxios.get(`/productos/${id}`)
            .then(response => {
                dispatch(editarProductoExito(response.data))
            })
            .catch(error => {  
                console.log(error); 
                dispatch(editarProductoError())
            })
        }
}

export const obtenerProductoAction = ()=>({
    type: OBTENER_PRODUCTO_EDITAR
})

export const editarProductoExito = (producto) => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
})

export const editarProductoError = () => ({
    type: PRODUCTO_EDITAR_ERROR
})

/* Modifica un producto en la API y state */
export function editarProductoAction(producto){
    return (dispatch) => {
        dispatch(comenzarEdicionProducto())

        // Consultar la API
        clienteAxios.put(`/productos/${producto.id}`, producto)
        .then(response => {
            dispatch(edicionProductoExito(response.data))
        })
        .catch(() => {
            dispatch(edicionProductoFracaso())
        })
    }
}

export const comenzarEdicionProducto = () =>({
    type : COMENZAR_EDICION_PRODUCTO
})

export const edicionProductoExito = (producto) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload : producto
})

export const edicionProductoFracaso = () => ({
    type: PRODUCTO_EDITADO_FRACASO
})
