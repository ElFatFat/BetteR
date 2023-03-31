<?php
require_once 'loginToken.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
//Vérification de la méthode
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents("php://input"));
    $id = "";
    $idLike = "";

    // On vérifie qu'elles ne sont pas vides
    if(!empty($data->tag) && !empty($data->idLike)){
        // On nettoie les données envoyées
        $tag = strip_tags($data->tag);
        $idLike = strip_tags($data->idLike);
        $sql = "SELECT `user_id` FROM `user` WHERE `tag` = '".$tag."';";
        
        $result = $conn->query($sql);
        //On vérifie que l'utilisateur 1 existe.
        if (mysqli_num_rows($result) > 0) {
            //Un uitlisateur avec ce tag existe. On récupère son id.
            $row = mysqli_fetch_assoc($result);
            $id = $row['user_id'];
        }else {
            http_response_code(400);
            exit();
        }
        
        $sql = "SELECT * FROM `likes` WHERE `bet_id` = '".$idLike."' AND `user_id` = '".$id."';";
        $result = $conn->query($sql);
        if (mysqli_num_rows($result) > 0) {
            //L'utilisateur à liké ce bet
                http_response_code(204);
                exit();
        }else {
            //L'utilisateur n'a pas liké ce bet.
            http_response_code(403);
            exit();
        }


    }else{
        // Données incomplètes
        http_response_code(400);
        echo json_encode(["error" => "Données incomplétes"]);

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
    }
}

?>