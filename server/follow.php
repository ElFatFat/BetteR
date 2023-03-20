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
    $idToFollow = "";

    // On vérifie qu'elles ne sont pas vides
    if(!empty($data->tag) && !empty($data->tagToFollow)){
        // On nettoie les données envoyées
        $tag = strip_tags($data->tag);
        $tagToFollow = strip_tags($data->tagToFollow);
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

        $sql = "SELECT `user_id` FROM `user` WHERE `tag` = '".$tagToFollow."';";
        $result = $conn->query($sql);
        //On vérifie que l'utilisateur 2 existe.
        if (mysqli_num_rows($result) > 0) {
            //Un uitlisateur avec ce tag existe. On récupère son id.
            $row = mysqli_fetch_assoc($result);
            $idToFollow = $row['user_id'];
        }else {
            http_response_code(400);
            exit();
        }

        if($id == $idToFollow){
            http_response_code(403);
            exit();
        }


        $sql = "SELECT * FROM `follow` WHERE `followee` = '".$idToFollow."' AND `follower` = '".$id."';";
        $result = $conn->query($sql);
        if (mysqli_num_rows($result) > 0) {
            //L'utilisateur suit déjà l'utilisateur ciblé.
            http_response_code(403);
            exit();
        }else {
            //L'utilisateur ne suit pas l'utilisateur ciblé. On le fait suivre.
            $sql = "INSERT INTO `follow` (`followee`, `follower`) VALUES ('".$idToFollow."', '".$id."');";
            $result = $conn->query($sql);
            if ($result) {
                http_response_code(200);
            }
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