let vecProductos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        vecProductos = data;
        cargarProductos(vecProductos);
    })

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll('.boton-categoria');
const tituloPrincipal  = document.querySelector('.titulo-principal');
let botonesAgregar  = document.querySelectorAll('.producto-agregar');
const numerito = document.querySelector('#numerito');
let botonDetalle = document.querySelectorAll('.producto-descripcion');

function cargarProductos(productosElegidos){
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add('productos');
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>		            
		        <button class="producto-descripcion" id="${producto.id}">
                <span>Detalle</span>
                </button>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        
        contenedorProductos.append(div);
    })  
    actualizarBotonesDetalle ();
    actualizarBotonesAgregar ();
}
cargarProductos(vecProductos);


botonesCategorias.forEach(boton => {
    boton.addEventListener('click',(e) => {
        botonesCategorias.forEach(boton => boton.classList.remove('active'));
        e.currentTarget.classList.add('active');
        

        if (e.currentTarget.id != "todos"){

            const productoCategoria = vecProductos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = vecProductos.filter(producto=> producto.categoria.id===e.currentTarget.id)
            cargarProductos(productosBoton);

        }else{
            tituloPrincipal.innerText = 'Todos los Productos'
            cargarProductos(vecProductos);
        }

    })
});

function actualizarBotonesDetalle () {
    botonDetalle = document.querySelectorAll('.producto-descripcion');
    botonDetalle.forEach(boton => {
        boton.addEventListener('click',mostrarDesplegable);
    });
}

function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll('.producto-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click',agregarAlCarrito);
    });

}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem('productos-en-carrito');


if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}

function mostrarDesplegable(e) { 

    const idBoton = e.currentTarget.id;
    const productoDetalle = vecProductos.find(producto => producto.id === idBoton);
    Swal.fire({
        title: `${productoDetalle.titulo}`,
        text: `${productoDetalle.descripcion}`,
        imageUrl: `${productoDetalle.imagen}`,
        imageWidth: 300,
        imageHeight: 150,
        imageAlt: 'Custom image',
    })
}
    
function agregarAlCarrito(e){

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: '2rem',
          fontSize: '.75rem',
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y:  '1.5rem'// vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = vecProductos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem('productos-en-carrito',JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad,0);
    numerito.innerText = nuevoNumerito; 
}


