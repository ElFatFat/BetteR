<?php
require_once 'loginToken.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
//Vérification de la méthode
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents("php://input"));

    // echo json_encode($data);
    // http_response_code(200);
    // exit();
    // On vérifie qu'elles ne sont pas vides
    if(!empty($data->bet_id) ){
        // On nettoie les données envoyées
        $bet_id = strip_tags($data->bet_id);
        $sql = "SELECT bet.*, user.username, user.tag, user.profile_picture_url FROM `bet` JOIN user ON `bet_id` = '".$bet_id."' AND bet.user_id = user.user_id";
        $result = $conn->query($sql);
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);

            $timeStamp = $row['post_time'];
            $timeStampDate = date( "Y-m-d", strtotime($timeStamp));
            $timeStampHour = date( "H:i:s", strtotime($timeStamp));
            $timeStamp = $timeStampDate."T".$timeStampHour;
            $row['post_time'] = $timeStamp;

            $sql = "SELECT COUNT(*) FROM bet WHERE rebet_ref = '".$bet_id."'";
            $result = $conn->query($sql);
            $row['rebet_count'] = mysqli_fetch_assoc($result)['COUNT(*)'];
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