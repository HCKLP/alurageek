// Importar funciones desde los módulos correspondientes
import { obtenerProductos, agregarProductoBackend } from './crud.js';
import { actualizarMensaje } from './ui.js';

// Inicializar la aplicación cuando el contenido de la página esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    obtenerProductos(); // Llamada para obtener y mostrar productos al cargar la página
    actualizarMensaje(); // Actualiza el mensaje de estado del contenedor de productos
});

// Agregar evento al formulario para manejar la adición de un nuevo producto
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío estándar del formulario

    // Obtener valores de los campos de entrada
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').value;

    // Llamar a la función para agregar el producto en el backend
    agregarProductoBackend(nombre, precio, imagen);

    // Resetear el formulario después de agregar el producto
    this.reset();

    // Actualizar el mensaje en el UI después de agregar el producto
    actualizarMensaje();
});
