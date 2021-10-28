import displaySearchBar from "./searchBar.js";

const isValidUser = () => {
    const name = localStorage.getItem("Name");
    return name;
}

const addNavbarStyling = () => {
    const link = document.createElement("link");
    const link2 = document.createElement("link");
    
    link.rel = "stylesheet";
    link.href = "../CSS file/navbar.css";
    link2.rel = "stylesheet";
    link2.href = "../CSS file/loadingIndicator.css";
    
    document.head.append(link, link2);
} 

const displayIcon = ( { name="Music", target="./index.html", ImgSrc="https://music.youtube.com/img/on_platform_logo.svg" } ) => {
    const container = document.createElement("div");
    const text = document.createElement("h1");

    container.className = "nav-icons";
    text.className = "nav-texts";
    text.innerHTML = name;

    if ( name == "Music" ){
        const logo = document.createElement("img");
        logo.src = ImgSrc;
        logo.className = "nav-icons logo";
        text.className += " main-text";
        container.append( logo );
    } else {
        const logo = document.createElement("div");
        logo.innerHTML = ImgSrc; 
        logo.className = "nav-md-logo";
        text.className += " nav-large";
        container.append( logo );
    }

    container.className = "flex hover link";
    addLocationChanger(container, target);
    container.append( text );
    return container;
}

const addLocationChanger = (target, location) => {
    target.addEventListener("click", ()=>{
        window.location.href = location;
    })
}

const displaySearch = () => {
    const container = document.createElement("div");
    const searchIcon = document.createElement("div");
    const searchText = document.createElement("h1");

    searchIcon.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" ></path></g></svg>';
    searchText.textContent = "Search";

    searchIcon.className = "nav-icons logo";
    searchText.className = "nav-texts nav-search-text";
    container.className = "flex hover searchBar"

    container.append( searchIcon, searchText );
    container.addEventListener("click", () => {
        displaySearchBar();
        console.log("a")
    })
    return container;
}


const displayMainBar = ( pageTitle ) => {
    const container = document.createElement( "div" );
    const pages = document.createElement("div");
    
    const home = displayIcon({
        name: "Home",
        target: "./index.html",
        ImgSrc: `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" ></path></g></svg>`
    });
    const explore = displayIcon({
        name: "Explore",
        target: "./explore.html",
        ImgSrc: `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z" class="style-scope yt-icon"></path><path d="M0 0h24v24H0z" fill="none"></path></g></svg>`
    });
    const library = displayIcon({
        name: "Library",
        target: "./library.html",
        ImgSrc: `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M0 0h24v24H0z" fill="none" ></path><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"></path></g></svg>`
    });
    const upgrade = displayIcon({
        name: "Upgrade",
        target: "./upgrade.html",
        ImgSrc: `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M12 0.47998C5.63998 0.47998 0.47998 5.63998 0.47998 12C0.47998 18.36 5.63998 23.52 12 23.52C18.36 23.52 23.52 18.36 23.52 12C23.52 5.63998 18.36 0.47998 12 0.47998ZM12 18.82C8.22998 18.82 5.17998 15.77 5.17998 12C5.17998 8.22998 8.22998 5.17998 12 5.17998C15.77 5.17998 18.82 8.22998 18.82 12C18.82 15.77 15.77 18.82 12 18.82Z" fill-rule="nonzero" ></path><path d="M12 6.02002C8.70996 6.02002 6.01996 8.70002 6.01996 12C6.01996 15.3 8.69996 17.98 12 17.98C15.3 17.98 17.98 15.3 17.98 12C17.98 8.70002 15.29 6.02002 12 6.02002ZM9.74996 15.4V8.60002L15.63 12L9.74996 15.4Z" fill-rule="nonzero" ></path></g></svg>`
    });

    if ( !isValidUser() ){
        upgrade.className = "hide";
    }

    switch ( pageTitle ) {
        case "Home":
            home.className += " active-page";
            break;
        case "Explore":
            explore.className += " active-page";
            break;
        case "Library":
            library.className += " active-page";
            break;
        case "Upgrade":
            upgrade.className += " active-page";
            break;
    }

    const search = displaySearch();

    pages.className = "pages flex";
    container.className = "main-bar flex";

    pages.append( home, explore, library, upgrade );
    container.append( pages, search );
    return container;
}

const displayUserIcon = () => {
    const container = document.createElement( "div" );
    const userName = isValidUser();
    if ( !userName ){
        container.textContent = "SIGN IN";
        container.className = "nav-sign-in";
        addLocationChanger(container, "./login.html")
    } else {
        container.textContent = userName[0];
        container.className = "nav-user hover";
    }
    return container;
}

/**
 * 
 * @param {pageTitle} param0 possible page names includes "Home", "Explore", "Library" and "Upgrade" 
 * @returns 
 */
const navbar = ( { pageTitle = "home" } ) => {
    
    addNavbarStyling();

    const div = document.createElement("div");
    
    div.className = "navbar flex";

    const icon =  displayIcon({});
    const mainBar = displayMainBar( pageTitle );
    const userIcon = displayUserIcon();

    div.append( icon, mainBar, userIcon );
    let flag = false;

    window.addEventListener("scroll", () => {
        if ( scrollY > 10 ){
            document.getElementsByClassName("navbar")[0].classList.add("scroll");
            flag = true;
        } else if ( flag ) {
            document.getElementsByClassName("navbar")[0].classList.remove("scroll");
            flag = false;
        }
    })
    
    return div;
}

export default navbar;