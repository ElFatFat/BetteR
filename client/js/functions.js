//Login using a username(or email) and password and return a token and the tag
const baseURL = "http://localhost/BetteR/";

const login = async () => {
    let username = document.getElementById("usernameLogin").value;
    let password = document.getElementById("passwordLogin").value;
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
        window.location.href = "home.html";
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
            "Content-Type": "application/json"
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
        json.forEach(element => {
            getBet(element);
        });
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
        document.getElementById("subNumber").innerHTML = json.length;
    }else if(response.status == 204){
        console.log("L'utilisateur ne suit personne")
        document.getElementById("subNumber").innerHTML = "0";
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
        document.getElementById("followerNumber").innerHTML = json.length;
    }else if(response.status == 204){
        console.log("Personne ne vous suit.")
        document.getElementById("followerNumber").innerHTML = "0";
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
    let content = document.getElementById("writeBet").value;
    let rebet = null;

    const response = await fetch(baseURL+"server/createBet.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token

        },
        body: JSON.stringify({
            tag,
            id,
            content,
            rebet
        }),
    });
    const data = await response;

    if(response.status == 204){
        console.log('Bet créé');
        alert("Bet créé");
    }else if(response.status == 400){
        console.log('Données incomplétes')
    }else if(response.status == 401){
        console.log('Token invalide')
    }else if(response.status == 403){
        console.log('Impossible de ne plus suivre cet utilisateur (soit-même ou pas suivi)')
    }else if(response.status == 404){
        console.log('Bet référencé inexistant')
    }else{
        console.log('Erreur inconnue : ' + response.status)
        json = await response.json();
        console.log(json);
    }
}

const follow = async (name) => {
    let token = localStorage.getItem("token");
    let tag = localStorage.getItem("tag");
    let tagToFollow = name;

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
        alert("Impossible de suivre cet utilisateur (soit-même ou déjà suivi)")
    }else{
        console.log('Erreur inconnue : ' + response.status)
        json = await response.json();
        console.log(json);
    }
}

const unfollow = async (name) => {
    let token = localStorage.getItem("token");
    let tag = localStorage.getItem("tag");
    let tagToUnfollow = name;

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
        alert("Impossible de ne plus suivre cet utilisateur (soit-même ou pas suivi)")
    }else{
        console.log('Erreur inconnue : ' + response.status)
        json = await response.json();
        console.log(json);
    }
}

const getBet = async (number) => {
    let token = localStorage.getItem("token");
    let tag = localStorage.getItem("tag");
    let bet_id = number;

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
        addBet(json.username, json.tag, timeSince(json.post_time), json.content);
        if(json.rebet_ref === null){
            console.log('Pas de rebet');
        }else{
            console.log('Rebet du bet : ' + json.rebet_ref);
        }
    }else if(response.status == 400){
        console.log('Données incomplétes, ou bet inexistant')
    }else if(response.status == 401){
        console.log('Token invalide')
    }else{
        console.log('Erreur inconnue' + response.status)
    }
}

const getUser = async (number) => {
    let token = localStorage.getItem("token");
    let tag = localStorage.getItem("tag");
    let user_id = number;

    const response = await fetch(baseURL+"server/getUser.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token

        },
        body: JSON.stringify({
            tag,
            user_id
        }),
    });
    const data = await response;

    if(response.status == 200){
        console.log('Informations du user récupéré');
        json = await response.json();
        console.log(json);
        // console.log(data);
    }else if(response.status == 400){
        console.log('Données incomplétes, ou utilisateur inexistant')
    }else if(response.status == 401){
        console.log('Token invalide')
    }else{
        console.log('Erreur inconnue' + response.status)
    }
}

const randomUser = async (number) => {
    let token = localStorage.getItem("token");
    let tag = localStorage.getItem("tag");

    const response = await fetch(baseURL+"server/randomUser.php", {
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
        console.log('Informations aléatoires récupérées');
        json = await response.json();
        console.log(json);
        //créer une boucle qui parcours les tableaux dans un tableau et qui ajoute les infos dans les balises p randomUsernameInfo et randomTagInfo
        for(let i = 0; i < json.length; i++){
            addRandomUser(json[i].username, json[i].tag, i);
        }
    }else if(response.status == 400){
        console.log('Données incomplétes, ou utilisateur inexistant')
    }else if(response.status == 401){
        console.log('Token invalide')
    }else{
        console.log('Erreur inconnue' + response.status)
    }
}

function addRandomUser(username, tag, i){
    document.getElementsByClassName("randomUsernameInfo")[i].innerHTML = username;
    document.getElementsByClassName("randomTagInfo")[i].innerHTML = "@"+tag;
    document.getElementsByClassName("followBtn")[i].setAttribute("onclick", "follow('"+tag+"')");
    document.getElementsByClassName("unfollowBtn")[i].setAttribute("onclick", "unfollow('"+tag+"')");
}


function whoami(){
    let token = localStorage.getItem("token");
    let tag = localStorage.getItem("tag");
    let id = localStorage.getItem("id");

    console.log('Token : ' + token);
    console.log('Tag : ' + tag);
    console.log('ID : ' + id);
}

function timeSince(date) {
    let theDate = new Date(date);
    var seconds = Math.floor((new Date() - theDate) / 1000);
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return "Il y a " + Math.floor(interval) + " ans";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return "Il y a " + Math.floor(interval) + " mois";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return "Il y a " + Math.floor(interval) + " jours";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return "Il y a " + Math.floor(interval) + " heures";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return "Il y a " + Math.floor(interval) + " minutes";
    }
    return "Il y a " + Math.floor(seconds) + " secondes";
}
  var aDay = 24*60*60*1000;
  console.log(timeSince(new Date(Date.now()-aDay)));
  console.log(timeSince(new Date(Date.now()-aDay*2)));

//create a function to add a new div to the page with the bet content
function addBet(betUsername, betTag, betDate, betContent) {
    let middleContainer = document.getElementById("middleContainer");
    let newBet = document.createElement("div");
    let newUserInfoWrapper = document.createElement("div");
    let newUserPfp = document.createElement("img");
    let newUserInfo = document.createElement("div");
    let newUsernameInfo = document.createElement("p");
    let newtagInfo = document.createElement("p");
    let newBetDate = document.createElement("p");
    let newDateInfo = document.createElement("div");
    let newBetContent = document.createElement("p");
    let newActionsWrapper = document.createElement("div");
    let newLike = document.createElement("div");
    let newRebet = document.createElement("div");
    let newLikeLogo = document.createElement("img");
    let newRebetLogo = document.createElement("img");
    let newLikeNumber = document.createElement("p");
    let newRebetNumber = document.createElement("p");
    newBet.classList.add("bets");
    newUserInfoWrapper.classList.add("userInfoWrapper");
    newUserInfo.classList.add("userInfo");
    newUsernameInfo.classList.add("usernameInfo");
    newtagInfo.classList.add("tagInfo");
    newDateInfo.classList.add("dateInfo");
    newBetContent.classList.add("betContent");
    newActionsWrapper.classList.add("actionsWrapper");
    newLike.classList.add("like");
    newRebet.classList.add("rebet");
    newUserPfp.src = "ressources/pictures/profile/default.jpeg";
    newUsernameInfo.innerHTML = betUsername;
    newtagInfo.innerHTML = "@"+betTag;
    newUserInfo.appendChild(newUsernameInfo);
    newUserInfo.appendChild(newtagInfo);
    newBetDate.innerHTML = betDate;
    newDateInfo.appendChild(newBetDate);
    newUserInfoWrapper.appendChild(newUserPfp);
    newUserInfoWrapper.appendChild(newUserInfo);
    newUserInfoWrapper.appendChild(newDateInfo);
    newBet.appendChild(newUserInfoWrapper);
    newBetContent.innerHTML = betContent;
    newBet.appendChild(newBetContent);
    newLikeLogo.src = "ressources/like_logo.png";
    newRebetLogo.src = "ressources/rebet_logo.png";
    newLikeNumber.innerHTML = "0";
    newRebetNumber.innerHTML = "0";
    newLike.appendChild(newLikeLogo);
    newLike.appendChild(newLikeNumber);
    newRebet.appendChild(newRebetLogo);
    newRebet.appendChild(newRebetNumber);
    newActionsWrapper.appendChild(newLike);
    newActionsWrapper.appendChild(newRebet);
    newBet.appendChild(newActionsWrapper);
    middleContainer.appendChild(newBet);
}

const getMe = async (number) => {
    let token = localStorage.getItem("token");
    let tag = localStorage.getItem("tag");
    let user_id = localStorage.getItem("id");

    const response = await fetch(baseURL+"server/getUser.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token

        },
        body: JSON.stringify({
            tag,
            user_id
        }),
    });
    const data = await response;

    if(response.status == 200){
        console.log('Informations du user récupéré');
        json = await response.json();
        console.log(json);
        document.getElementsByClassName("usernameInfo")[0].innerText = json.username;
        document.getElementsByClassName("tagInfo")[0].innerText = "@" + json.tag;
        document.getElementsByClassName("usernameInfo")[1].innerText = json.username;
        document.getElementsByClassName("tagInfo")[1].innerText = "@" + json.tag;
        getFolloweelist(json.tag);
        getFollowlist(json.tag);
    }else if(response.status == 400){
        console.log('Données incomplétes, ou utilisateur inexistant')
    }else if(response.status == 401){
        console.log('Token invalide')
    }else{
        console.log('Erreur inconnue' + response.status)
    }
}

const getOwnlist = async () => {
    let tag = localStorage.getItem("tag");
    let token = localStorage.getItem("token");
    const response = await fetch(baseURL+"server/getOwnBet.php", {
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
        json.forEach(element => {
            getBet(element);
        });
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

const like = async (id) => {
    let token = localStorage.getItem("token");
    let tag = localStorage.getItem("tag");
    let idToLike = id;

    const response = await fetch(baseURL+"server/like.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token

        },
        body: JSON.stringify({
            tag,
            idToLike,
        }),
    });
    const data = await response;

    if(response.status == 200){
        console.log('Like réussi');
        //BOB, DO SOMETHING
    }else if(response.status == 400){
        console.log('Utilisateur inexistant / données incomplétes')
    }else if(response.status == 401){
        console.log('Token invalide')
    }else if(response.status == 403){
        console.log('Vous likez déjà ce tweet')
    }else{
        console.log('Erreur inconnue : ' + response.status)
        json = await response.json();
        console.log(json);
    }
}

const unlike = async (id) => {
    let token = localStorage.getItem("token");
    let tag = localStorage.getItem("tag");
    let idToUnlike = id;

    const response = await fetch(baseURL+"server/unlike.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token

        },
        body: JSON.stringify({
            tag,
            idToUnlike,
        }),
    });
    const data = await response;
    
    if(response.status == 204){
        console.log('Unlike réussi');
        //BOB, DO SOMETHING
    }else if(response.status == 400){
        console.log('Utilisateur inexistant / données incomplétes')
    }else if(response.status == 401){
        console.log('Token invalide')
    }else if(response.status == 403){
        console.log('Vous ne likez pas ce tweet')
    }else{
        console.log('Erreur inconnue : ' + response.status)
        json = await data.json();
        console.log(json);
    }
}

const liked = async (id) => {
    let token = localStorage.getItem("token");
    let tag = localStorage.getItem("tag");
    let idToUnlike = id;

    const response = await fetch(baseURL+"server/unlike.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token

        },
        body: JSON.stringify({
            tag,
            idToUnlike,
        }),
    });
    const data = await response;
    
    if(response.status == 204){
        console.log('Vous likez ce bet')
    }else if(response.status == 403){
        console.log('Vous ne likez pas ce bet')
    }else{
        console.log('Erreur inconnue : ' + response.status)
        json = await data.json();
        console.log(json);
    }
}

const getOwnlist = async () => {
    let tag = localStorage.getItem("tag");
    let token = localStorage.getItem("token");
    const response = await fetch(baseURL+"server/getOwnBet.php", {
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