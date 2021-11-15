import navbar from "../components/navbar.js";
import displaySearchBar from "../components/searchBar.js";
import loadingIndicator from "../components/loadingIndicator.js";
import createMusicPlayer from "../components/player.js";

// Variables to store data
let searchResults = {
    song: null, 
    artist: null,
    playlist: null,
    video: null
}

let userLibrary = {
    song:[],
    playlist: [],
    artist: [],
    video: []
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

const fetchTypeResults = (type, query) => {
    const url = `http://localhost:3002/search/${type}/${query}`;
    return fetch( url )
        .then( res => res.json() )
}

const createCard = ( data ) => {
    const container = document.createElement("div");
    const meta = document.createElement("div");
    const footer = document.createElement("div");

    const img = document.createElement("img");
    const title = document.createElement("h1");
    const type = document.createElement("h6");
    const artist = document.createElement("h6");
    
    if ( data.thumbnails ){
        if ( data.thumbnails[0] ){
            img.src = data.thumbnails[0].url;
        } else {
            img.src = data.thumbnails.url;;
        }
    } else {
        img.src = "https://lh3.googleusercontent.com/Oy0MoVVYmt7e2QhRbN4mrnerSbnEGEbtQxeRriRhMkHDZC1a-HUVsL6ziQy3tkDMoVbsogBHvj2WqtLD=w544-h544-l90-rj"
    }
    
    title.textContent = data.name;
    artist.textContent = data.author;
    type.textContent = data.type;
    type.textContent = type.textContent[0].toUpperCase() + type.textContent.slice(1);
    
    container.id = data.browseId;
        
    container.className = "detail-card " + type.textContent;
    meta.className = "detail-meta";
    footer.className = "detail-footer";

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
    const addCont = document.createElement("div");

    imgOver.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>';
    add.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M0 0h24v24H0z" fill="none" class="style-scope yt-icon"></path><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" class="style-scope yt-icon"></path></g></svg>';
    addSmall.innerHTML = 'Add to Library';


    addCont.className = "add-cont";
    addCont.append(add, addSmall);

    if ( type.textContent == "a" ) type.textContent = "Artist";

    if ( type.textContent && userLibrary[type.textContent.toLocaleLowerCase()] && userLibrary[type.textContent.toLocaleLowerCase()].length > 0 ){
        for ( const item of userLibrary[type.textContent.toLocaleLowerCase()] ){
            if ( container.id == item.browseId || container.id == item.videoId ){
                add.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path fill="none" d="M0 0h24v24H0z" class="style-scope yt-icon"></path><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7.53 12L9 10.5l1.4-1.41 2.07 2.08L17.6 6 19 7.41 12.47 14zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" class="style-scope yt-icon"></path></g></svg>';
                addSmall.textContent = "Remove from Library";
            }
        }    
    }
    
    imgOver.className = "img-over";
    add.className = "add";
    addSmall.className = "add-small";
    addCont.className += " add-btn"

    footer.append( type, artist );
    meta.append( title, footer );
    container.append( img, imgOver, meta, addCont );
    return container;
}

const displaydetails = (data, target, k) => {
    const container = document.getElementById(target);
    container.innerHTML = "";
    const name = document.createElement("h2");
    const see = document.createElement("h2");
    const frag = document.createElement("div");

    name.textContent = data[1].type || data[0].type;
    if ( name.textContent == "a" ) name.textContent = "Artist";
    name.textContent = name.textContent[0].toUpperCase() + name.textContent.slice(1) + "s";
    see.textContent = "SHOW ALL";

    name.className = "search-heading";
    see.className = name.textContent + " subhead";

    let lim = ( data.length < 3 ? data.length : 3 );

    if ( k ){
        lim = data.length;
        see.textContent = "Close";
        see.className += " close";
    }


    for ( let i = 0; i < lim; i++ ){
        const card = createCard(data[i]);
        frag.append( card );
    }

    container.append( name, frag, see );
}

const displaydetailsType = async ( type, input ) => {
    try {
        const data = await fetchTypeResults( type, input );
        searchResults[type] = data;
        displaydetails( data.content, type );    
    } catch ( err ) {
        console.log(err);
    }
}

const displayResults = async ( input ) => {
    try {
        await ( displaydetailsType( "song", input ) );
        loadingIndicator( "results", false );
        
        await displaydetailsType( "playlist", input );
        await displaydetailsType( "artist", input );
        await displaydetailsType( "video", input );

    } catch ( err ) {
        console.log(err);
    }
}

const handleSearch = async () => {
    try {
        const input = localStorage.getItem("q")
        loadingIndicator( "results", true );
        await displayResults(input);
    } catch ( err ) {
        console.log( err )
    }    
}

const removeFromLibrary = async (target) => {
    try {
        const category = target.classList[1].toLowerCase();
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
            "songs": userLibrary["song"],
            "artists": userLibrary["artist"],
            "playlists": userLibrary["playlist"],
            "videos": userLibrary["video"]
        }
        await updateLibrary(parentId, payload);
    } catch ( err ) {
        console.log(err)
    }
}


const addToLibrary = async (target) => {
    try {
        const category = target.classList[1].toLowerCase();
        console.log(category);
        const id = target.id;
        const data = searchResults[category].content;
        for ( const res of userLibrary[category] ){
            if ( id == res.browseId || id == res.videoId ){
                removeFromLibrary(target);
                return;
            }
        }
        for ( const d of data ){
            if ( id == d.browseId || id == d.videoId ){

                userLibrary[category].push(d);
                const parentId = JSON.parse(localStorage.getItem("User")).id;
                const payload = {
                    "id": userLibrary.id,
                    "parentId": parentId,
                    "songs": userLibrary["song"],
                    "artists": userLibrary["artist"],
                    "playlists": userLibrary["playlist"],
                    "videos": userLibrary["video"]
                }
                await updateLibrary(parentId, payload);
            }
        }
    } catch ( err ) {
        console.log(err);
    }
}

{/* <div id="6qbLAG4dbVU" class="detail-card Song">
    <img src="https://lh3.googleusercontent.com/j-HhhFOJSnlFpBhurVxf8MnCTBXACTIw_IxIAJTA9PZS4LdF08NNOu_lOBH_vQsjSXDq7tmbDSB7rh4=w60-h60-l90-rj">
        <div class="img-over">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path></svg>
        </div>
        <div class="detail-meta">
            <h1>Car Confessions (Clean)</h1>
            <div class="detail-footer">
                <h6>Song</h6>
                <h6 id="RDAMVM6qbLAG4dbVU">Young M.A</h6>
            </div>
        </div>
    <div class="add">Add to Library</div>
    <div class="add-small">+</div>
</div> */}

const clickHandler = (event) => {
    event.preventDefault();
    if(event.target.parentElement.classList[0] == "img-over" ) {
        const target = event.target.parentElement.parentElement;
        const name = target.getElementsByTagName("H1")[0].textContent;
        const img = target.getElementsByTagName("IMG")[0].src;
        const artist = target.getElementsByTagName("H6")[1].textContent;
        // console.log(name, img, artist);
        // console.log(target)
        createMusicPlayer(name, img, artist);
    } else if ( event.target.parentElement.parentElement.classList[0] == "img-over" ){
        const target = event.target.parentElement.parentElement.parentElement;
        const name = target.getElementsByTagName("H1")[0].textContent;
        const img = target.getElementsByTagName("IMG")[0].src;
        const artist = target.getElementsByTagName("H6")[1].textContent;
        // console.log(name, img, artist);
        createMusicPlayer(name, img, artist);
    }
    const tarClass = event.target.classList;
    if ( tarClass[0] ){
        const target = tarClass[0].toLowerCase();
        if ( tarClass[2] == "close" ){
            displaydetails(searchResults[target.slice(0, target.length-1)].content, target.slice(0, target.length-1), false);
            document.getElementById("results").style.display = "block";
            document.getElementById("details-view").style.display = "none";
        } else if ( tarClass[1] == "subhead" ){
            displaydetails(searchResults[target.slice(0, target.length-1)].content, "details-view", true);
            document.getElementById("details-view").style.display = "block";
            document.getElementById("results").style.display = "none";
            document.getElementById("library").style.display = "none";
        } else if ( tarClass[0] === "search-heading"){
            const tar = event.target.textContent.toLowerCase();
            displaydetails(searchResults[tar].content, tar, true);
        } else if ( tarClass[0] == "tab" ){
            const name = event.target.textContent.toLowerCase();
            const libraryElem = document.getElementById("library");
            const resultElem = document.getElementById("results");
            const tabs = document.getElementsByClassName("tab");
            if ( name == "library" ){
                document.getElementById("details-view").style.display = "none";
                resultElem.style.display = "none";
                libraryElem.style.display = "block";
                tabs[0].classList.remove("active");
                tabs[1].classList.add("active");
            } else {
                resultElem.style.display = "block";
                libraryElem.style.display = "none";
                tabs[0].classList.add("active");
                tabs[1].classList.remove("active");
            }
        } else if ( tarClass[1] == "add-btn") {
            const target = event.target.parentElement;
            event.target.getElementsByClassName("add")[0].innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path fill="none" d="M0 0h24v24H0z" class="style-scope yt-icon"></path><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7.53 12L9 10.5l1.4-1.41 2.07 2.08L17.6 6 19 7.41 12.47 14zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" class="style-scope yt-icon"></path></g></svg>';
            event.target.getElementsByClassName("add-small")[0].innerHTML = 'Remove from Library';
            event.target.classList.remove("add-btn");
            addToLibrary(target);
        } else if ( event.target.parentElement.classList[1] == "add-btn" ){
            console.log(event.target);
            event.target.parentElement.getElementsByClassName("add")[0].innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path fill="none" d="M0 0h24v24H0z" class="style-scope yt-icon"></path><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7.53 12L9 10.5l1.4-1.41 2.07 2.08L17.6 6 19 7.41 12.47 14zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" class="style-scope yt-icon"></path></g></svg>';
            event.target.parentElement.getElementsByClassName("add-small")[0].innerHTML = 'Remove from Library';
            event.target.parentElement.classList.remove("add-btn");
            addToLibrary(event.target.parentElement.parentElement);
        }
    }
}

// handle load
const loadPlaylist = async () => {
    try {
        const id = JSON.parse(localStorage.getItem("User")).id;
        let lib = await fetchLibrary(id);
        lib = lib[0];
        if ( lib ){
            userLibrary = {
                id: lib.id,
                parentId: lib.parentId,
                song: lib.songs,
                playlist: lib.playlists,
                artist: lib.artists,
                video: lib.videos
            }
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
        console.log(err);
    }
}

const handleLoad = () => {
    document.body.querySelector("nav").append(navbar({ pageTitle: "Search" }));
    displaySearchBar();
    const input = document.getElementsByClassName("search-bar")[0].querySelector("input");
    input.value = localStorage.getItem("q");
    handleSearch();
}

window.addEventListener("load", () => {
    if ( !localStorage.getItem("q") ){
        window.location.href = "./index.html";
    }
    handleLoad();
    loadPlaylist();
    document.body.addEventListener("click", (event) => {
        event.preventDefault();
        clickHandler(event); 
    });
})