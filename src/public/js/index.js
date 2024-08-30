/* const inputId = document.querySelector('#id');
const btnSubmit = document.querySelector('#btnSubmit');
const socket = io();


btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    let id = inputId.value
    let response = await fetch('/api/products/:id', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    })
    let data = await response.json();
    console.log(data);
    
}) */
    const inputId = document.querySelector('#id');
    const btnSubmit = document.querySelector('#btnSubmit');
    const socket = io();
    
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        let id = inputId.value;
        socket.emit('filtrarPorId', id);
    });
    
    socket.on('filtrarPorIdResponse', (data) => {
        console.log(data);
        if (data.product) {
            // Actualiza el DOM con el producto filtrado
            const productHTML = `
                <h2>Producto filtrado</h2>
                <p>Nombre: ${data.product.name}</p>
                <p>Precio: ${data.product.price}</p>
                <p>Descripción: ${data.product.description}</p>
            `;
            document.getElementById('product-container').innerHTML = productHTML;
        } else if (data.error) {
            // Muestra un mensaje de error en el DOM
            const errorHTML = `
                <h2>Error</h2>
                <p>${data.error}</p>
            `;
            document.getElementById('product-container').innerHTML = errorHTML;
        }
    });