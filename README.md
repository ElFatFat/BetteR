
# BetteR 📝 
Twitter but BetteR 

## Codes d'erreur API

| Code HTTP | Description                       |
| :-------- | :-------------------------------- |
| `200`  | **SUCCES** |
| `204`  | **SUCCES** | Aucune réponse envoyée |
| `400` | **ERREUR** Données incomplétes|
| `401` | **ERREUR** Erreur d'authentification|
| `403` | **ERREUR** Action refusée|
| `405` | **ERREUR** Mauvaises méthode. POST uniquement|   
  
 
## Requêtes API

<br>

**Connexion**
~~~http
  POST ../server/login.php
~~~

| Parametre | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`  | `string` | **Requis**. Tag ou Email |
| `password` | `string` | **Requis**. |   

<br><br>
**Connexion par token**
~~~http
  POST ../server/loginToken.php
~~~

| Parametre | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `tag`  | `string` | **Requis**. Tag |
| `token` | `string` | **Requis**. |   

<br><br>
**Inscription**
~~~http
  POST ../server/register.php
~~~

| Parametre | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`  | `string` | **Requis**. Nom d'utilisateur |
| `tag` | `string` | **Requis**. Nom unique|   
| `email` | `string` | **Requis**. Email unique|   
| `password` | `string` | **Requis**.|   

<br><br>
**Récuperer liste bets**
~~~http
  POST ../server/???.php
~~~

| Parametre | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `tag`  | `string` | **Requis**.|
| `token` | `string` | **Requis**.|   

<br><br>
**Vérification possession upgrade**
~~~http
  POST ../server/getUpgrade.php
~~~

| Parametre | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`  | `string` | **Requis**.|
| `token`  | `string` | **Requis**.|
| `token` | `string` | **Requis**.|   



## IDs Amélioration

| ID | Type d'amélioration                       |
| :-------- | :-------------------------------- |
| `0-99`  | Contour Bet
| `100-199`  | Contour icone de profil
| `200-299` | Icone likes
| `300-399` | Icone commentaires
| `400-499` | Icone rebets
| `500-599` | Couleur Username
| `600-699` | Style Username
| `1000` | GIF Photo profil
| `1001` | GIF Photo de couverture
