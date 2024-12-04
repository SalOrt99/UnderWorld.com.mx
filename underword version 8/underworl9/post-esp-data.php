<?php
// Variables de conexión
$servername = "localhost";
$dbname = "5tsm2";
$username = "root";
$password = "";

// api_key
$apikeyvalue = "5tsm2-LLAVE";

// Variables para recibir la información de la ESP32
$apikey = $lugar = $temperatura = $luz = "";

// Validar que sea con el método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Tomar la llave
    if (isset($_POST["apikey"])) {
        $apikey = test_input($_POST["apikey"]);
    }

    // Validar la llave
    if ($apikey == $apikeyvalue) {
        // Tomar los valores enviados desde el POST
        if (isset($_POST["lugar"]) && isset($_POST["temperatura"]) && isset($_POST["luz"])) {
            $lugar = test_input($_POST["lugar"]);
            $temperatura = test_input($_POST["temperatura"]);
            $luz = test_input($_POST["luz"]);

            // Conectarme a MySQL
            $conn = new mysqli($servername, $username, $password, $dbname);

            // Validar conexión
            if ($conn->connect_error) {
                die("Fallo la conexión: " . $conn->connect_error);
            }

            // Insertar registro
            $sql = "INSERT INTO datos (temperatura, luz, lugar) VALUES ('$temperatura', '$luz', '$lugar')";

            if ($conn->query($sql) === TRUE) {
                echo "Registrado";
            } else {
                echo "Error: " . $conn->error;
            }

            // Cerrar conexión
            $conn->close();
        } else {
            echo "Faltan datos en el POST";
        }
    } else {
        echo "API key no válida";
    }
} else {
    echo "Debe ser invocado con el método POST";
}

// Limpiar información
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
