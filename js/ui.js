import { eliminarProductoBackend } from './crud.js';

// Función para agregar un producto a la interfaz
export function agregarProducto(producto) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="card-container--info">
            <p>${producto.nombre}</p>
            <div class="card-container--value">
                <p>$ ${producto.precio}</p>
                <img src="/image/icons/delete.png" alt="Eliminar" class="icono-eliminar">
            </div>
        </div>
    `;

    // Agregar el evento de eliminación
    card.querySelector('.icono-eliminar').addEventListener('click', () => {
        eliminarProductoBackend(producto.id, card);
    });

    return card;
}

// Mostrar/ocultar el mensaje "No se han agregado productos"
export function actualizarMensaje() {
    const productosContainer = document.getElementById('productos');
    const mensajeNoProductos = document.querySelector('.no-productos');
    
    if (productosContainer.children.length === 0) {
        mensajeNoProductos.style.display = 'block';
    } else {
        mensajeNoProductos.style.display = 'none';
    }
}
