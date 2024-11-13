// Importar funciones desde el módulo de UI para manipular la interfaz
import { agregarProducto, actualizarMensaje } from './ui.js';

// Definir la URL base para acceder a los datos en el servidor local de JSON Server
const API_URL = 'http://localhost:3000/productos';

/* 
 * Obtener productos del backend y mostrarlos en el UI
 */
export async function obtenerProductos() {
    try {
        // Realizar solicitud GET para obtener todos los productos
        const response = await fetch(API_URL);
        
        // Verificar si la solicitud fue exitosa
        if (!response.ok) throw new Error('Error al obtener productos');

        // Convertir la respuesta a formato JSON
        const productos = await response.json();

        // Limpiar contenedor de productos en el DOM antes de agregar los nuevos
        const productosContainer = document.getElementById('productos');
        productosContainer.innerHTML = '';

        // Iterar sobre los productos obtenidos y agregarlos al contenedor
        productos.forEach(producto => {
            productosContainer.appendChild(agregarProducto(producto));
        });
    } catch (error) {
        console.error('Error en obtenerProductos:', error);
    }
}

/* 
 * Agregar un nuevo producto al backend y actualizar el UI
 */
export async function agregarProductoBackend(nombre, precio, imagen) {
    // Crear el objeto de nuevo producto
    const nuevoProducto = {
        nombre,
        precio: parseFloat(precio), // Asegurarse de que el precio sea un número
        imagen
    };

    try {
        // Realizar solicitud POST para agregar el nuevo producto al backend
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Especificar el tipo de contenido
            },
            body: JSON.stringify(nuevoProducto) // Convertir el producto a JSON para enviar
        });

        // Verificar si la solicitud fue exitosa
        if (!response.ok) throw new Error('Error al agregar producto');

        // Obtener la respuesta del nuevo producto agregado
        const data = await response.json();

        // Agregar el nuevo producto al contenedor en el UI
        const productosContainer = document.getElementById('productos');
        productosContainer.appendChild(agregarProducto(data));
    } catch (error) {
        console.error('Error en agregarProductoBackend:', error);
    }
}

/* 
 * Eliminar un producto específico del backend y actualizar el UI
 */
export function eliminarProductoBackend(id, element) {
    // Realizar solicitud DELETE para eliminar el producto en el backend
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        // Eliminar el producto de la interfaz
        element.remove();
        
        // Actualizar el mensaje de estado después de la eliminación
        actualizarMensaje();
    })
    .catch(error => console.error('Error al eliminar producto:', error));
}
