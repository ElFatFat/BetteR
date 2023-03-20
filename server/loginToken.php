<?php

require_once 'db_connect.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
//Vérification de la méthode
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents("php://input"));
    $headers = apache_request_headers();
    $token = $headers['Authorization'];
    
    // On vérifie qu'elles ne sont pas vides
    if(!empty($token) && !empty($data->tag)){
        // On nettoie les données envoyées
        $token = strip_tags($token);
        $tag = strip_tags($data->tag);

        $sql = 'SELECT * FROM `user` WHERE `tag` = "'.$tag.'" AND `token`= "'.$token.'";';
        $result = $conn->query($sql);
        if (mysqli_num_rows($result) > 0) {
            //REUSSITE DE L'AUTHENTIFICATION PAR TOKEN

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
    if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
        http_response_code(200);
        echo json_encode(["message" => "OPTIONS"]);
        exit();
    }
    else{
        // Mauvaise méthode, on gère l'erreur
        http_response_code(405);
        echo json_encode(["error" => "Utilisez la méthode POST"]);
        exit();
    }
}
?>