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
    $idToUnlike = "";

    // On vérifie qu'elles ne sont pas vides
    if(!empty($data->tag) && !empty($data->idToUnlike)){
        // On nettoie les données envoyées
        $tag = strip_tags($data->tag);
        $idToUnlike = strip_tags($data->idToUnlike);
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
        
        $sql = "SELECT * FROM `likes` WHERE `bet_id` = '".$idToUnlike."' AND `user_id` = '".$id."';";
        $result = $conn->query($sql);
        if (mysqli_num_rows($result) > 0) {
            //L'utilisateur ne suit pas l'utilisateur ciblé.
            $sql = "DELETE FROM `likes` WHERE `bet_id` = '".$idToUnlike."' AND `user_id` = '".$id."';";
            $result = $conn->query($sql);
            if ($result) {
                http_response_code(204);
            }
        }else {
            //L'utilisateur ne suit pas l'utilisateur ciblé.
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