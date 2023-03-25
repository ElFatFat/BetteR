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
    if(!empty($data->tag) && !empty($data->id) && !empty($data->content) && (!empty($data->rebet) || $data->rebet == null)){
        // On nettoie les données envoyées
        $tag = strip_tags($data->tag);
        $id = strip_tags($data->id);
        $content = strip_tags($data->content);
        $rebet = strip_tags($data->rebet);
        if($rebet == null){
            //On ne reference pas de bet, Bet Original.
            $sql = "INSERT INTO `bet` (`user_id`, `content`, `rebet_ref`) VALUES ('".$id."', '".$content."', NULL);";
        } else {
            //Bet Réponse.
            //On vérifie que la bet référencée existe.
            $sql = "SELECT * FROM `bet` WHERE `bet_id` = '".$rebet."';";
            $result = $conn->query($sql);
            if($result->num_rows == 0){
                //La bet référencée n'existe pas.
                http_response_code(406);
                echo json_encode(["error" => "La bet référencée n'existe pas."]);
                exit();
            }
            $sql = "INSERT INTO `bet` (`user_id`, `content`, `rebet_ref`) VALUES ('".$id."', '".$content."', '".$rebet."');";
        }
        
        // http_response_code(406);
        // echo json_encode($sql);
        // exit();
        $result = $conn->query($sql);
        http_response_code(204);
        exit();

    }else{
        // Données incomplètes
        http_response_code(400);
        exit();
    }
}else{
    if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
        http_response_code(200);
        exit();
    }
    else{
        // Mauvaise méthode, on gère l'erreur
        http_response_code(405);
        echo json_encode(["error" => "Utilisez la méthode POST"]);
    }
}

?>