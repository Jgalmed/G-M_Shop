<?php   
    $name = $_POST['name'];
    $email = $_POST['email'];
    $tel = $_POST['tel'];
    $dirp = $_POST['dirp'];
    $dirs = $_POST['dirs'];
    $ndir = $_POST['ndir'];
    if($_POST){
        $misDatosjson = json_decode($_POST["datos"]);
        print_r($misDatosjson)
    }else{
        echo "No recibí datos por POST";
    }

    $formcontent = "
        Nombre: $name \n
        Correo: $email \n
        Teléfono: $tel \n
        Calle Principal: $dirp \n
        Calle Secundaria: $dirs \n 
        Nro Casa: $ndir \n
        Productos: $misDatosjson \n
    "   
    $recipient = "jgallegos.jg99@gmail.com";

    $subject = "Compra $name";

    $header = "From: $email \r\n";
    $header .= "Content-Type: text/plain; charset=UTF-8";
    mail($recipient, $subject, $formcontent, $header) or die("Error!");
    header("Location: index.html");
    */
?>