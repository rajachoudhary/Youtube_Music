import loadingIndicator from "../components/loadingIndicator.js";
import createMusicPlayer from "../components/player.js";
import navbar from "../components/navbar.js";

// Variables to store data

let userLibrary = {
    songs:[],
    playlists: [],
    artists: [],
    videos: []
}

const fetchLibrary = (id) => {
    const url = `http://localhost:3000/library?parentId=${id}`;
    return fetch( url )
        .then( res => res.json() )
}

const updateLibrary = (id, payload) => {
    let methodP = "POST";
    let url = `http://localhost:3000/library`;
    if ( payload.id ){
        methodP = "PUT";
        url += `/${payload.id}`;
    }
    const config = {
        method: methodP,
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(payload)
    }
    return fetch( url, config )
        .then( res => res.json())
}

const removeFromLibrary = async (target) => {
    try {
        const category = target.classList[1].toLowerCase() + "s";
        const id = target.id;
        for ( let i = 0; i < userLibrary[category].length; i++ ){
            if ( id == userLibrary[category][i].browseId || id == userLibrary[category][i].videoId ){
                userLibrary[category].splice( i, 1 );
                break;
            }
        }
        const parentId = JSON.parse(localStorage.getItem("User")).id;
        const payload = {
            "id": userLibrary.id,
            "parentId": parentId,
            "songs": userLibrary["songs"],
            "artists": userLibrary["artists"],
            "playlists": userLibrary["playlists"],
            "videos": userLibrary["videos"]
        }
        await updateLibrary(parentId, payload);
    } catch ( err ) {
        errorHandler(err)
    }
}

const loadPlaylist = async () => {
    try {
        const id = JSON.parse(localStorage.getItem("User")).id;
        let lib = await fetchLibrary(id);
        if ( lib[0] ){
            userLibrary = lib[0];
        } else {
            const parentId = JSON.parse(localStorage.getItem("User")).id;
            const payload = {
            "parentId": parentId,
            "songs": [],
            "artists": [],
            "playlists": [],
            "videos": []
        }
        await updateLibrary(parentId, payload);
        }
    } catch ( err ) {
        errorHandler(err)
    }
}

const createCard = ( data ) => {
    const container = document.createElement("div");
    const meta = document.createElement("div");

    const img = document.createElement("img");
    const title = document.createElement("h1");
    const artist = document.createElement("h6");
    
    if ( data.thumbnails ){
        if ( data.thumbnails[0] ){
            img.src = data.thumbnails[data.thumbnails.length-1].url;
        } else {
            img.src = data.thumbnails.url;
        }
    } else {
        img.src = "https://lh3.googleusercontent.com/Oy0MoVVYmt7e2QhRbN4mrnerSbnEGEbtQxeRriRhMkHDZC1a-HUVsL6ziQy3tkDMoVbsogBHvj2WqtLD=w544-h544-l90-rj"
    }
    title.textContent = data.name;
    artist.textContent = data.author;
    container.id = data.browseId;
        
    container.className = "detail-card " + data.type;
    meta.className = "detail-meta";

    switch ( data.type ){
        case "song":
            if ( data.album.name ){
                artist.textContent = data.album.name;
                artist.id = data.album.browseId;
            }
        case "video":
            artist.id = data.playlistId
            container.id = data.videoId;
            break;
        case "artist":
            img.classList.add("artist");
            break;
        case "playlist":
            title.textContent = data.title;
            break;
    }
    const imgOver = document.createElement("div");
    const add = document.createElement("div");
    const addSmall = document.createElement("div");

    imgOver.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>';
    const addCont = document.createElement("div");
    add.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path fill="none" d="M0 0h24v24H0z" class="style-scope yt-icon"></path><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7.53 12L9 10.5l1.4-1.41 2.07 2.08L17.6 6 19 7.41 12.47 14zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" class="style-scope yt-icon"></path></g></svg>';
    addSmall.innerHTML = 'Remove from Library';

    imgOver.className = "img-over";
    add.className = "add";
    addSmall.className = "add-small";
    addCont.className = "add-cont";
    addCont.append(add, addSmall);

    // if ( data.type !== "song" ) {
    //     meta.classList.add("big-meta");
    //     imgOver.classList.add("big-img-over");
    //     add.classList.add("remove");
    //     addSmall.classList.add("remove");
    //     container.classList.add("big-container");
    // }

    meta.append( title, artist );
    container.append( img, imgOver, meta, addCont );
    return container;
}

const displaydetails = (data, target, k) => {
    
    const container = document.getElementById(target);
    container.innerHTML = "";
    const see = document.createElement("h2");
    const frag = document.createElement("div");

    if ( data.length <= 0 ){
        const div = document.createElement("div");
        div.className = "error";
        frag.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"></path></g></svg>';
        see.textContent = "Add your favourite " + target + ", to see here!";
        frag.className = "disc";
        div.append( frag, see );
        container.append( div );
        return;
    }

    see.textContent = "SHOW ALL";
    see.className = target + " subhead";
    let lim = ( data.length < 5 ? data.length : 5 );
    if ( k ){
        lim = data.length;
        see.textContent = "close";
        see.className += " close " + data[0].type;
    }
    for ( let i = 0; i < lim; i++ ){
        const card = createCard(data[i]);
        frag.append( card );
    }
    container.append( frag, see );
}

const handleView = ( event, name ) => {
    const tabs = document.getElementsByClassName("tab");
    const views = document.getElementsByClassName("list-view");
    for ( const item of tabs ){
        item.classList.remove("active");
    }
    event.target.classList.add("active");
    for ( const view of views ){
        view.style.display = "none";
    }
    const targetElem = document.getElementById(name);
    displaydetails(userLibrary[name], name)
    targetElem.style.display = "block";
}

const clickHandler = (event) => {
    const tarClass = event.target.classList;
    // console.log(event.target.parentElement)
    if(event.target.parentElement.classList[0] == "img-over" ) {
        const target = event.target.parentElement.parentElement;
        const name = target.getElementsByTagName("H1")[0].textContent;
        const img = target.getElementsByTagName("IMG")[0].src;
        const artist = target.getElementsByTagName("H6")[0].textContent;
        // console.log(name, img, artist);
        // console.log(target)
        createMusicPlayer(name, img, artist);
    } else if ( event.target.parentElement.parentElement.classList[0] == "img-over" ){
        const target = event.target.parentElement.parentElement.parentElement;
        const name = target.getElementsByTagName("H1")[0].textContent;
        const img = target.getElementsByTagName("IMG")[0].src;
        const artist = target.getElementsByTagName("H6")[0].textContent;
        // console.log(name, img, artist);
        createMusicPlayer(name, img, artist);
    } else if ( tarClass[0] == "add-cont") {
        const target = event.target.parentElement;
        removeFromLibrary(target);
        target.parentElement.style.display = "none";
    } else if ( event.target.parentElement.classList[0] == "add-cont" ){
        removeFromLibrary(event.target.parentElement.parentElement);
        event.target.parentElement.parentElement.style.display = "none";
    }
    if ( tarClass[0] ){
        const target = tarClass[0].toLowerCase();
        if ( tarClass[2] == "close" ){
            document.getElementById("details-view").style.display = "none";
            document.getElementById(event.target.classList[3] + "s").style.display = "block";
        } else if ( tarClass[1] == "subhead" ){
            document.getElementById(event.target.classList[0]).style.display = "none";
            displaydetails(userLibrary[target], "details-view", true);
            document.getElementById("details-view").style.display = "block";
        } else if ( tarClass[0] == "tab" ){
            const name = event.target.textContent.toLowerCase();
            handleView(event, name);
        } 
    }
}

function errorHandler(err){
    const tabs = document.getElementsByClassName("item-details");
    for ( const tab of tabs ){
        tab.style.display = "none";
    }
    document.getElementById("error-page").style.display = "block";
    console.log(err);
}

const handleLoad = async () => {
    document.body.querySelector("nav").append(navbar({ pageTitle: "Library" }));
    loadingIndicator("playlists", true);
    await loadPlaylist();
    displaydetails(userLibrary["playlists"], "playlists");
    loadingIndicator("playlists", false);
    document.body.addEventListener("click", (event) => {
        event.preventDefault();
        clickHandler(event); 
    });
}


window.addEventListener("load", async () => {
    if ( !localStorage.getItem("User") ){
        window.location.href = "./login.html";
    }
    handleLoad();
})