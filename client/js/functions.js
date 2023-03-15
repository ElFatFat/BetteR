//Login using a username(or email) and password and return a token and the tag
const baseURL = "http://localhost/BetteR/";

const login = async () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    const response = await fetch(`${baseURL}server/login.php`, {
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

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("tag", data.tag);
        localStorage.setItem("id", data.id);
        console.log("Authentification réussie : \n\n" + data.token + "\n" + data.tag + "\n" + data.id);
    }
};

const loginToken = async () => {
    let token = document.getElementById("token").value;
    let tag = document.getElementById("usernameToken").value;
    const response = await fetch("../server/loginToken.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
            tag,
        }),
    });
    const data = await response;
    console.log(data.status);
    if(data.status == 204){
        console.log('Connexion réussie')
    }else{
        console.log('Connexion échouée')
    }
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

const getBetlist = async () => {
    let tag = localStorage.getItem("tag");
    let token = localStorage.getItem("token");
    const response = await fetch("../server/test.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
            tag,
        }),
    });
    const data = await response.json();
    console.log(data);

    if(response.status == 200){
        console.log('Liste récupérée')
    }else if(response.status == 401){
        console.log('Token invalide')
    }else{
        console.log('Erreur inconnue')
    }
}

const getUpgrade = async () => {
    let id = localStorage.getItem("id");
    let tag = localStorage.getItem("tag");
    let token = localStorage.getItem("token");
    let upgrade = document.getElementById("idUpgrade").value;

    const response = await fetch("../server/getUpgrade.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
            tag,
            id,
            upgrade
        }),
    });
    const data = await response.json();
    console.log(data);

    if(response.status == 200){
        //BOB, DO SOMETHING
    }else if(response.status == 401){
        console.log('Token invalide')
    }else if(response.status == 403){
        console.log('Upgrade non possédée')
    }else{
        console.log('Erreur inconnue : ' + response.status)
    }
}

const addUpgrade = async () => {
    let id = localStorage.getItem("id");
    let tag = localStorage.getItem("tag");
    let token = localStorage.getItem("token");
    let upgrade = document.getElementById("setUpgrade").value;

    const response = await fetch("../server/addUpgrade.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
            tag,
            id,
            upgrade
        }),
    });
    const data = await response.json();

    if(response.status == 200){
        console.log(data)
        console.log('Tout marche bien');
        //BOB, DO SOMETHING
    }else if(response.status == 401){
        console.log('Token invalide')
    }else if(response.status == 403){
        console.log('Upgrade déjà possédée')
    }else{
        console.log('Erreur inconnue : ' + response.status)
    }
}


const deleteUpgrade = async () => {
    let id = localStorage.getItem("id");
    let tag = localStorage.getItem("tag");
    let token = localStorage.getItem("token");
    let upgrade = document.getElementById("setUpgrade").value;

    const response = await fetch("../server/deleteUpgrade.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            token,
            tag,
            id,
            upgrade
        }),
    });
    const data = await response.json();

    if(response.status == 200){
        console.log(data)
        console.log('Tout marche bien');
        //BOB, DO SOMETHING
    }else if(response.status == 401){
        console.log('Token invalide')
    }else if(response.status == 403){
        console.log('Upgrade non possédée')
    }else{
        console.log('Erreur inconnue : ' + response.status)
    }
}

const createBet = async () => {
    let tag = localStorage.getItem("tag");
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("id");
    let content = document.getElementById("contentBet").value;

    const response = await fetch("../server/createBet.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
            tag,
            id,
            content
        }),
    });
    const data = await response.json();

    if(response.status == 200){
        console.log(data)
        console.log('Bet créé');
        //BOB, DO SOMETHING
    }else if(response.status == 401){
        console.log('Token invalide')
    }else if(response.status == 403){
        console.log('Bet non crée')
    }else{
        console.log('Erreur inconnue : ' + response.status)
    }
}