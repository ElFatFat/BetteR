//Login using a username(or email) and password and return a token and the tag
const baseURL = "http://localhost/BetteR/";

const login = async () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    const response = await fetch(baseURL+'server/login.php', {
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
    const response = await fetch(baseURL+"server/loginToken.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            tag,
        }),
    });
    const data = await response;
    console.log(data.status);
    if(data.status == 200){
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
    const response = await fetch(baseURL+"server/register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
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
    const response = await fetch(baseURL+"server/getBetList.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            tag,
        }),
    });
    const data = await response;

    if(response.status == 200){
        console.log('Liste récupérée');
        json = await response.json();
        console.log(json);
    }else if(response.status == 204){
        console.log("L'utilisateur ne suit personne")
    }else if(response.status == 400){
        console.log('Données incomplétes, ou utilisateur inexistant')
    }else if(response.status == 401){
        console.log('Token invalide')
    }else if(response.status == 404){
        console.log('Aucun bets dans le betlist')
    }else{
        console.log('Erreur inconnue' + response.status)
    }
}
const getFollowlist = async (wantTag) => {
    let tag = localStorage.getItem("tag");
    let token = localStorage.getItem("token");
    const response = await fetch(baseURL+"server/getFollowList.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            tag,
            wantTag
        }),
    });
    const data = await response;

    if(response.status == 200){
        console.log('Liste des personnes que vous suivez récupérée');
        json = await response.json();
        console.log(json);
    }else if(response.status == 204){
        console.log("L'utilisateur ne suit personne")
    }else if(response.status == 400){
        console.log('Données incomplétes, ou utilisateur inexistant')
    }else if(response.status == 401){
        console.log('Token invalide')
    }else{
        console.log('Erreur inconnue' + response.status)
    }
}

const getFolloweelist = async (wantTag) => {
    let tag = localStorage.getItem("tag");
    let token = localStorage.getItem("token");
    const response = await fetch(baseURL+"server/getFolloweeList.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            tag,
            wantTag
        }),
    });
    const data = await response;

    if(response.status == 200){
        console.log('Liste des personne qui vous Follow récupérée');
        json = await response.json();
        console.log(json);
    }else if(response.status == 204){
        console.log("Personne ne vous suit.")
    }else if(response.status == 400){
        console.log('Données incomplétes, ou utilisateur inexistant')
    }else if(response.status == 401){
        console.log('Token invalide')
    }else{
        console.log('Erreur inconnue' + response.status)
    }
}

const getUpgrade = async () => {
    let id = localStorage.getItem("id");
    let tag = localStorage.getItem("tag");
    let token = localStorage.getItem("token");
    let upgrade = document.getElementById("idUpgrade").value;

    const response = await fetch(baseURL+"server/getUpgrade.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token

        },
        body: JSON.stringify({
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

    const response = await fetch(baseURL+"server/addUpgrade.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
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

    const response = await fetch(baseURL+"server/deleteUpgrade.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
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

    const response = await fetch(baseURL+"server/createBet.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token

        },
        body: JSON.stringify({
            tag,
            id,
            content
        }),
    });
    const data = await response;

    if(response.status == 204){
        console.log('Bet créé');
        //BOB, DO SOMETHING
    }else if(response.status == 400){
        console.log('Données incomplétes')
    }else if(response.status == 401){
        console.log('Token invalide')
    }else if(response.status == 403){
        console.log('Impossible de ne plus suivre cet utilisateur (soit-même ou pas suivi)')
    }else{
        console.log('Erreur inconnue : ' + response.status)
        json = await response.json();
        console.log(json);
    }
}

const follow = async () => {
    let token = localStorage.getItem("token");
    let tag = localStorage.getItem("tag");
    let tagToFollow = document.getElementById("followInput").value;

    const response = await fetch(baseURL+"server/follow.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token

        },
        body: JSON.stringify({
            tag,
            tagToFollow,
        }),
    });
    const data = await response;

    if(response.status == 200){
        console.log('Follow réussi');
        //BOB, DO SOMETHING
    }else if(response.status == 400){
        console.log('Utilisateur inexistant / données incomplétes')
    }else if(response.status == 401){
        console.log('Token invalide')
    }else if(response.status == 403){
        console.log('Impossible de suivre cet utilisateur (soit-même ou déjà suivi)')
    }else{
        console.log('Erreur inconnue : ' + response.status)
        json = await response.json();
        console.log(json);
    }
}

const unfollow = async () => {
    let token = localStorage.getItem("token");
    let tag = localStorage.getItem("tag");
    let tagToUnfollow = document.getElementById("unfollowInput").value;

    const response = await fetch(baseURL+"server/unfollow.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token

        },
        body: JSON.stringify({
            tag,
            tagToUnfollow,
        }),
    });
    const data = await response;

    if(response.status == 204){
        console.log('Unfollow réussi');
        //BOB, DO SOMETHING
    }else if(response.status == 400){
        console.log('Utilisateur inexistant / données incomplétes')
    }else if(response.status == 401){
        console.log('Token invalide')
    }else if(response.status == 403){
        console.log('Impossible de ne plus suivre cet utilisateur (soit-même ou pas suivi)')
    }else{
        console.log('Erreur inconnue : ' + response.status)
        json = await response.json();
        console.log(json);
    }
}

const getBet = async () => {
    let token = localStorage.getItem("token");
    let tag = localStorage.getItem("tag");
    let bet_id = document.getElementById("btnBet").value;

    const response = await fetch(baseURL+"server/getBet.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token

        },
        body: JSON.stringify({
            tag,
            bet_id
        }),
    });
    const data = await response;

    if(response.status == 200){
        console.log('Informations du bet récupéré');
        json = await response.json();
        console.log(json);
    }else if(response.status == 400){
        console.log('Données incomplétes, ou bet inexistant')
    }else if(response.status == 401){
        console.log('Token invalide')
    }else{
        console.log('Erreur inconnue' + response.status)
    }
}

function whoami(){
    let token = localStorage.getItem("token");
    let tag = localStorage.getItem("tag");
    let id = localStorage.getItem("id");

    console.log('Token : ' + token);
    console.log('Tag : ' + tag);
    console.log('ID : ' + id);
}