import navbar from "../components/navbar.js";
import displaySearchBar from "../components/searchBar.js";
import loadingIndicator from "../components/loadingIndicator.js";

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
    const type = document.createElement("type");
    const artist = document.createElement("h2");
    
    img.src = data.thumbnails[0].url || data.thumbnails.url;
    title.textContent = data.name;
    artist.textContent = data.author;
    type.textContent = data.type;

    container.id = data.videoId;
        
    container.className = "detail-card";
    meta.className = "detail-meta";
    footer.className = "detail-footer";

    footer.append( type, artist );
    meta.append( title, footer )
    container.append( img, meta );
    return container;
}


const displaydetails = (data, target) => {
    const container = document.getElementById(target);
    const name = document.createElement("h2");
    const see = document.createElement("h2");
    const frag = document.createElement("div");

    name.textContent = data[1].type || data[0].type + "s";
    see.textContent = "SHOW ALL";

    name.className = "search-heading";
    see.className = data.type + " subhead";

    
    for ( let i = 0; i < ( data.length < 3 ? data.length : 3 ) ; i++ ){
        const card = createCard(data[i]);
        frag.append( card );
    }


    container.append( name, frag, see );
}

const handleLoadMore = () => {

}


const displayResults = async ( input ) => {
    try {
        const songs = await fetchTypeResults( "song", input );    
        displaydetails( songs.content, "song" );

        loadingIndicator( "results", false );

        const artists = await fetchTypeResults( "artist", input );
        displaydetails(artists.content, "artist");

        const playlists = await fetchTypeResults( "playlist", input );
        displaydetails(playlists.content, "playlist");
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
    document.body.addEventListener("clcik", () => {
        if ( event.target.className == "song" || event.target.className == "artist" || event.target.className == "playlist" ){
            handleLoadMore();
        }
    })
})