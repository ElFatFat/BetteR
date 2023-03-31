<?php
require_once 'loginToken.php';
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
//Vérification de la méthode
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents("php://input"));
        $sql = "SELECT `user_id` FROM `user`";
        $result = $conn->query($sql);
        $users = [];
        if (mysqli_num_rows($result) > 0) {
            //Define an array that contains all the users
            $array = [];
            while($row = mysqli_fetch_assoc($result)){
                $array[] = $row;
            }
            for($i = 0; $i < 5; $i++){
                $random = rand(0, mysqli_num_rows($result)-1);
                $users[$i] = $array[$random];
            }

            //Return the array as json
            echo json_encode($users);
            http_response_code(200);
            exit();
        }else {
            http_response_code(404);
            exit();
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