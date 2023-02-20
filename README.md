
# BetteR 📝 
Twitter but BetteR 

## Codes d'erreur API

| Code HTTP | Description                       |
| :-------- | :-------------------------------- |
| `200`  | **SUCCES** |
| `400` | **ERREUR** Données incomplétes|
| `401` | **ERREUR** Erreur d'authentification|
| `405` | **ERREUR** Mauvaises méthode. POST uniquement|   
  
 
## API Reference

#### Login

~~~http
  POST ../server/login.php
~~~

| Parametre | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`  | `string` | **Required**. Tag ou Email |
| `password` | `string` | **Required**. |   