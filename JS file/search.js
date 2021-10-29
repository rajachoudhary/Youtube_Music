import navbar from "../components/navbar.js";
import displaySearchBar from "../components/searchBar.js";
import loadingIndicator from "../components/loadingIndicator.js";

// Variable to store data
const global = {
    song:null, 
    artist:null,
    playlist:null
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
        
    container.className = "detail-card";
    meta.className = "detail-meta";
    footer.className = "detail-footer";

    switch ( data.type ){
        case "song":
            if ( data.artist.name && data.artist.name.length > 0 || data.artist.name ){
                artist.textContent = data.artist.name || data.artist[0].name;
                artist.id = data.artist.browseId || data.artist[0].browseId;
            }
            container.id = data.videoId;
            break;
        case "artist":
            img.classList.add("artist");
            break;
        case "playlist":
            title.textContent = data.title;
            break;
    }

    footer.append( type, artist );
    meta.append( title, footer );
    container.append( img, meta );
    return container;
}

const displaydetails = (data, target, k) => {
    const container = document.getElementById(target);
    container.innerHTML = "";
    const name = document.createElement("h2");
    const see = document.createElement("h2");
    const frag = document.createElement("div");

    name.textContent = data[1].type || data[0].type + "s";
    name.textContent = name.textContent[0].toUpperCase() + name.textContent.slice(1);
    see.textContent = "SHOW ALL";

    name.className = "search-heading";
    see.className = name.textContent + " subhead";

    let lim = ( data.length < 3 ? data.length : 3 );

    if ( k ){
        lim = data.length;
        see.textContent = "close";
        see.className += " close";
    }


    for ( let i = 0; i < lim; i++ ){
        const card = createCard(data[i]);
        frag.append( card );
    }

    container.append( name, frag, see );
}

const displaydetailsType = async ( type, input ) => {
    const data = await fetchTypeResults( type, input );
    global[type] = data;
    displaydetails( data.content, type );
}

const displayResults = async ( input ) => {
    try {
        await ( displaydetailsType( "song", input ) );
        loadingIndicator( "results", false );

        await displaydetailsType( "playlist", input );
        await displaydetailsType( "artist", input );
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

window.addEventListener("load", () => {
    if ( !localStorage.getItem("q") ){
        window.location.href = "./index.html";
    }
    document.body.querySelector("nav").append(navbar({ pageTitle: "search" }));
    displaySearchBar();
    const input = document.getElementsByClassName("search-bar")[0].querySelector("input");
    input.value = localStorage.getItem("q");
    handleSearch();
    document.body.addEventListener("click", () => {
        const tarClass = event.target.classList;
        if ( tarClass[0] ){
            const target = tarClass[0].toLowerCase();
            if ( tarClass[2] == "close" ){
                displaydetails(global[target].content, target, false);
            } else if ( tarClass[1] == "subhead" ){
                displaydetails(global[target].content, target, true);
            } else if ( tarClass[0] === "search-heading"){
                const tar = event.target.textContent.toLowerCase();
                displaydetails(global[tar].content, tar, true);
            }
        } 
    })
})