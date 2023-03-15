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
    if(!empty($data->tag) && !empty($data->id) && !empty($data->content)){
        // On nettoie les données envoyées
        $tag = strip_tags($data->tag);
        $id = strip_tags($data->id);
        $content = strip_tags($data->content);
        $sql = "INSERT INTO `bet` (`user_id`, `content`, `is_A_Rebet`, `like_picture_url`, `rebet_picture_url`) VALUES ('".$id."', '".$content."', 0, 'default.jpeg', 'default.jpeg');";
        
        $result = $conn->query($sql);
        http_response_code(200);
        echo json_encode(["message" => "Le bet a bien été créé"]);
        exit();

    }else{
        // Données incomplètes
        http_response_code(400);
        echo json_encode(["error" => "Données incomplètes".$tag." ayant l'id ".$id." peut acheter l'upgrade ".$upgrade.""]);
    }
}else{
    // Mauvaise méthode, on gère l'erreur
    http_response_code(405);
    echo json_encode(["error" => "Utilisez la méthode POST"]);
}

?>