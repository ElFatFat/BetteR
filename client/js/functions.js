//Login using a username(or email) and password and return a token and the tag
const login = async () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    const response = await fetch("../server/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
    const data = await response.json();

    //FAIS CE QUE TU VEUX AVEC LE TOKEN
    //DANS LE JSON IL Y A UN CHAMP TOKEN ET UN CHAMP USER AVEC LE TAG DE L'UTILISATEUR
    //
    //CODE 200
    //CONNEXION REUSSIE
    //
    //CODE 400
    //DONNEES INCOMPLETES
    //
    //CODE 401
    //CONNEXION ECHOUEE
    //
    //CODE 405
    //MAUVAISE METHODE. UTILISE POST

    console.log(data);
};

const loginToken = async () => {
    let token = document.getElementById("token").value;
    let username = document.getElementById("usernameToken").value;
    console.log(token, username);
    const response = await fetch("../server/loginToken.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
            username,
        }),
    });
    const data = await response.json();
    console.log(data);
};

const register = async () => {
    let username = document.getElementById("usernameRegister").value;
    let tag = document.getElementById("tagRegister").value;
    let password = document.getElementById("passwordRegister").value;
    let email = document.getElementById("emailRegister").value;
    const response = await fetch("../server/register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
            email,
            tag,
        }),
    });
    const data = await response.json();
    console.log(data);
}