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
    $followeesList = [];
    $followeesBetList = [];



    // On vérifie qu'elles ne sont pas vides
    if(!empty($data->tag)){
        // On nettoie les données envoyées
        $tag = strip_tags($data->tag);
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

        $sql = "SELECT `followee` FROM `follow` WHERE `follower` = '".$id."';";
        $result = $conn->query($sql);
        if (mysqli_num_rows($result) > 0) {
            //L'utilisateur suit au moins un utilisateur.
            while($row = mysqli_fetch_assoc($result)) {
                $followeesList[] = $row['followee'];
            }
        }else {
            //L'utilisateur ne suit personne.
            http_response_code(204);
            exit();
        }
        //On converti l'array en string séparé par des virgules.
        $followeesListString = implode(",",$followeesList);

        //On récupére la liste compléte des bets composant la betlist, dans un ordre descendant (les plus récents en premier)
        $sql = "SELECT `bet_id` FROM `bet` WHERE `user_id` IN ($followeesListString) ORDER BY `post_time` DESC";
        $result = $conn->query($sql);

        if (mysqli_num_rows($result) > 0) {
            //L'utilisateur suit au moins un utilisateur.
            while($row = mysqli_fetch_assoc($result)) {
                $followeesBetList[] = $row['bet_id'];
            }
        }else {
            //L'utilisateur ne suit personne.
            http_response_code(204);
            exit();
        }
        http_response_code(200);
        echo json_encode($followeesBetList);
        exit();

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