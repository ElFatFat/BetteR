<?php

require_once 'db_connect.php';
header("Content-Type: application/json; charset=UTF-8");

//Vérification de la méthode
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents("php://input"));

    // On vérifie qu'elles ne sont pas vides
    if(!empty($data->token) && !empty($data->username)){
        // On nettoie les données envoyées
        $token = strip_tags($data->token);
        $username = strip_tags($data->username);

        // AUTHENTIFICATION PAR EMAIL
        $sql = 'SELECT * FROM `user` WHERE `tag` = "'.$username.'" AND `token`= "'.$token.'";';
        $result = $conn->query($sql);
        if (mysqli_num_rows($result) > 0) {
            //REUSSITE DE L'AUTHENTIFICATION PAR TOKEN
            http_response_code(200);
            echo json_encode(["message" => "Authentification par token réussie"]);

        }else {
            // ECHEC DE L'AUTHENTIFICATION
            http_response_code(401);
            echo json_encode(["error" => "Authentification par token échouée"]);
            exit();
        }
    }else{
        // Données incomplètes
        http_response_code(400);
        echo json_encode(["error" => "Données authentification incomplètes"]);
        exit();
    }
}else{
    // Mauvaise méthode, on gère l'erreur
    http_response_code(405);
    echo json_encode(["error" => "Utilisez la méthode POST"]);
    exit();
}
?>