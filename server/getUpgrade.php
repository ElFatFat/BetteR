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
    if(!empty($data->tag) && !empty($data->id) && !empty($data->upgrade)){
        // On nettoie les données envoyées
        $tag = strip_tags($data->tag);
        $id = strip_tags($data->id);
        $upgrade = strip_tags($data->upgrade);
        $sql = "SELECT * FROM `upgrades` WHERE `user_id` = '".$id."' AND `upgrade_id`= '".$upgrade."';";
        $result = $conn->query($sql);
        
        if (mysqli_num_rows($result) > 0) {
            //REUSSITE DE L'AUTHENTIFICATION PAR TOKEN
            http_response_code(200);
            echo json_encode(["message" => "L'upgrade ".$upgrade." est disponible pour ".$tag." ayant l'id ".$id.""]);
        }else {
            // ECHEC DE L'AUTHENTIFICATION
            http_response_code(403);
            echo json_encode(["error" => "L'upgrade ".$upgrade." n'est pas disponible pour ".$tag." ayant l'id ".$id."", "sql" => $sql]);
            exit();
        }


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