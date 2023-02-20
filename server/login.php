<?php

require_once 'db_connect.php';
header("Content-Type: application/json; charset=UTF-8");

//Vérification de la méthode
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents("php://input"));

    // On vérifie qu'elles ne sont pas vides
    if(!empty($data->username) && !empty($data->password)){
        // On nettoie les données envoyées
        $username = strip_tags($data->username);
        $password = strip_tags($data->password);


        // AUTHENTIFICATION PAR EMAIL
        $sql = 'SELECT * FROM `user` WHERE `email` = "'.$username.'";';
        $result = $conn->query($sql);
        if (mysqli_num_rows($result) > 0) {
            authentificate($result, $conn, $password);
        }else {
            // AUTHENTIFICATION PAR USERNAME
            $sql = 'SELECT * FROM `user` WHERE `tag` = "'.$username.'";';
            $result = $conn->query($sql);
            if (mysqli_num_rows($result) > 0) {
                authentificate($result, $conn, $password);
            }else {
                // ECHEC DE L'AUTHENTIFICATION
                http_response_code(401);
                echo json_encode(["message" => "Login inexstant"]);
            }
        }

    }else{
        // Données incomplètes
        http_response_code(400);
        echo json_encode(["message" => "Données incomplètes"]);
    }
}else{
    // Mauvaise méthode, on gère l'erreur
    http_response_code(405);
    echo json_encode(["message" => "Utilisez la méthode POST"]);
}

function authentificate($result, $conn, $password){
        while($row = mysqli_fetch_assoc($result)) {
            if(password_verify($password, $row['password'])){
                //REUSSITE DE L'AUTHENTIFICATION PAR TOKEN
                http_response_code(200);
                echo json_encode(["token" => $row['token'], "user" => $row['tag']]);
            }else {
                // ECHEC DE L'AUTHENTIFICATION
                http_response_code(401);
                echo json_encode(["message" => "Mot de passe incorrect"]);
            }
        }
}
?>