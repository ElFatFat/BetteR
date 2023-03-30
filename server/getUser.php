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
    if(!empty($data->user_id) ){
        // On nettoie les données envoyées
        $tag = strip_tags($data->bet_id);
        $sql = "SELECT `user_id`, `username`, `tag`, `betcoin`, `email`, `profile_picture_url`, `banner_picture_url` FROM `user` WHERE `user_id` = '".$data->user_id."';";
        $result = $conn->query($sql);
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            echo json_encode($row);
            http_response_code(200);
            exit();
        }else {
            http_response_code(404);
            exit();
        }

    }else{
        // Données incomplètes
        http_response_code(400);
    }
}else{
    if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
        http_response_code(200);
        echo json_encode(["message" => "OPTIONS"]);
        exit();
    }else{
        // Mauvaise méthode, on gère l'erreur
        http_response_code(405);
        echo json_encode(["error" => "Utilisez la méthode POST"]);
    }
}

?>