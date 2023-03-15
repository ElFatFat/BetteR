<?php
require_once 'loginToken.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
//Vérification de la méthode
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents("php://input"));

    // On vérifie qu'elles ne sont pas vides
    if(!empty($data->tag)){
        // On nettoie les données envoyées
        $tag = strip_tags($data->tag);

        http_response_code(200);
        echo json_encode(["message" => "Authentifié en tant que ".$tag."."]);

    }else{
        // Données incomplètes
        http_response_code(400);
        echo json_encode(["error" => "Données incomplètes"]);
    }
}else{
    // Mauvaise méthode, on gère l'erreur
    http_response_code(405);
    echo json_encode(["error" => "Utilisez la méthode POST"]);
}

?>