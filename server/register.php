<?php

require_once 'db_connect.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

//Vérification de la méthode
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents("php://input"));

    // On vérifie qu'elles ne sont pas vides
    if(!empty($data->password) && !empty($data->email) && !empty($data->username) && !empty($data->tag)){
        // On nettoie les données envoyées
        $username = strip_tags($data->username);
        $password = password_hash(strip_tags($data->password), PASSWORD_DEFAULT);
        $email = strip_tags($data->email);
        $tag = strip_tags($data->tag);
        

        // AUTHENTIFICATION PAR EMAIL
        $sql = 'SELECT * FROM `user` WHERE `email` = "'.$email.'" OR `tag`= "'.$tag.'";';
        $result = $conn->query($sql);
        if (mysqli_num_rows($result) > 0) {
            // COMPTE DEJA EXISTANT AVEC CES LOGINS
            http_response_code(401);
            echo json_encode(["error" => "Compte déjà existant"]);
        }else {
            // AUTHENTIFICATION PAR USERNAME
            $token = bin2hex(random_bytes(16));
            $sql = 'INSERT INTO `user`(`username`, `password`, `email`, `tag`, `token`) VALUES ("'.$username.'", "'.$password.'", "'.$email.'", "'.$tag.'", "'.$token.'")';
            $result = $conn->query($sql);
            http_response_code(200);
            echo json_encode(["token" => $token, "user" => $tag]);
        }

    }else{
        // Données incomplètes
        http_response_code(400);
        echo json_encode(["error" => "Données incomplètes"]);
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