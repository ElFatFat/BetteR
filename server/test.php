<?php

include_once 'db_connect.php';
header("Content-Type: application/json; charset=UTF-8");

        $email = 'trisson.valentin@gmail.com';
        $password = '0129Pokemon';

        // On prépare la requête
        $sql = 'SELECT * FROM `user` WHERE `email` = "'.$email.'";';
        echo $sql;
        $result = $conn->query($sql);
        echo 'yeh';
        if (mysqli_num_rows($result) > 0) {
            // output data of each row
            while($row = mysqli_fetch_assoc($result)) {
                echo "user_id: " . $row["user_id"]. " - username: " . $row["username"]. " " . $row["email"]. "<br>";
            }
        }else {
            echo "0 results";
        }

?>