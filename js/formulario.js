const productos = document.querySelector('productos-en-carrito');
const productoscarrito = localStorage.getItem('productos-en-carrito');
const botonEnviar = document.querySelector('#boton-form');
const produtosComprados = JSON.parse(productoscarrito); 
const productosEnviar = document.querySelector('#productos-enviar');
let enviar = [];
enviar = produtosComprados.map(function (elem) {
    let returnObjeto = { id: elem.id, cantidad: elem.cantidad, precio: elem.precio};
      return returnObjeto;
  });
productosEnviar.innerHTML = JSON.stringify(enviar);