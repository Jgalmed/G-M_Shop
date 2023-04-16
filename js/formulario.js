const productos = document.querySelector('productos-en-carrito');
const productoscarrito = localStorage.getItem('productos-en-carrito');
const botonEnviar = document.querySelector('#boton-form');
const produtosComprados = JSON.parse(productoscarrito); 
var jsonString = JSON.stringify(produtosComprados);

botonEnviar.addEventListener('click',enviarDatos)

function enviarDatos(){
    fetch('1.php',{
        method: 'POST',
        body: jsonString       
    })
    .then(function(response){
       // 
    })
    .catch(function(error){
        console.log('Hubo un erroral enviar los datos al servidor' + error.message);
    });    
}

