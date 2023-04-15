const productos = document.querySelector('productos-en-carrito');
const productoscarrito = localStorage.getItem('productos-en-carrito');
const produtosComprados = JSON.parse(productoscarrito); 
var mijson = JSON.encode(produtosComprados);
//const botonConfirmar = document.querySelector('#boton-form');
var myajax = new Request({
    url: "1.php",
    data: "datos" + mijson,
    onSuccess: function(textoRespuesta){
        $('resultado').set('html',textoRespuesta);
    },
    onFailure: function(){
        $('resultado').set("html","Fallo la conexión Ajax");
    } 
})

myajax.send();




/*
$.post({
    type: "POST",
    url: "./1.php",
    data: {'produtosComprados' : JSON.stringify(productoscarrito)},
    success: function(data){
    }
});

$('#form-boton').click(function(){
    $.post('1.php',produtosComprados,
        function(datos,estado){
            alert("Informacion: "+datos+"\nEstado: "+estado);
        })
    })
*/