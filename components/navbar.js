import displaySearchBar from "./searchBar.js";

const isValidUser = () => {
    const user = JSON.parse( localStorage.getItem("User") );
    return user;
}

const addNavbarStyling = () => {
    const link = document.createElement("link");
    const link2 = document.createElement("link");
    const link3 = document.createElement("link");
    
    link.rel = "stylesheet";
    link.href = "../CSS file/navbar.css";
    
    link2.rel = "stylesheet";
    link2.href = "../CSS file/loadingIndicator.css";
    
    link3.rel = "stylesheet";
    link3.href = "../CSS file/player.css";
    
    document.head.append(link, link2, link3);
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
        ImgSrc: `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"></path><path d="M0 0h24v24H0z" fill="none"></path></g></svg>`
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

    const search = displaySearch();

    let mainPage = true;

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
        case "Search":
            search.className += " active-page";
            mainPage = false;
            break;
        default:
            mainPage = false;
            break; 
    }

    if ( mainPage ){
        localStorage.removeItem("q");
    }

    pages.className = "pages flex";
    container.className = "main-bar flex";

    pages.append( home, explore, library, upgrade );
    container.append( pages, search );
    return container;
}

const createMenuOption = (name, img) => {
    const container = document.createElement("div");
    const icon = document.createElement("div");
    const text = document.createElement("div");

    icon.innerHTML = img;
    text.textContent = name;

    text.className = "menu-text";
    icon.className = "menu-icon";
    container.className = "menu-line";

    container.append( icon, text );
    return container;
}


const createUserMenu = () => {
    const container = document.createElement("div");
    const channel = createMenuOption(
        "Your channel",
        '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"></path><path d="M0 0h24v24H0z" fill="none"></path></g></svg>'
    );
    const prem = createMenuOption(
        "Get Music Premium",
        '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path fill-rule="nonzero" d="M21.78 8s-.2-1.37-.8-1.97c-.75-.8-1.6-.8-2-.85C16.2 4.98 12 5 12 5s-4.18-.02-6.97.18c-.4.05-1.24.05-2 .85-.6.6-.8 1.97-.8 1.97s-.2 1.63-.23 3.23v1.7c.03 1.6.23 3.2.23 3.2s.2 1.4.8 2c.76.8 1.75.76 2.2.85 1.57.15 6.6.18 6.77.18 0 0 4.2 0 7-.2.38-.04 1.23-.04 2-.84.6-.6.8-1.98.8-1.98s.2-1.6.2-3.22v-1.7c-.02-1.6-.22-3.22-.22-3.22zm-11.8 7V9.16l5.35 3.03L9.97 15z"></path></g></svg>'
    );
    const switchAcc = createMenuOption(
        "Switch account",
        '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"  style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h12zm-3 5c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm-9 8v1h12v-1c0-2-4-3.1-6-3.1S8 13 8 15z" ></path></g></svg>'
    );
    const signOut = createMenuOption(
        "Sign Out",
        '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"  style="pointer-events: none; display: block; width: 100%; height: 100%;"><g mirror-in-rtl="" ><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" ></path></g></svg>' 
    );
    const line = document.createElement("hr");
    const upload = createMenuOption(
        "Upload music",
        '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"  style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" ></path></g></svg>'
    );
    const history = createMenuOption(
        "History",
        '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"  style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M11.9 3.75c-4.55 0-8.23 3.7-8.23 8.25H.92l3.57 3.57.04.13 3.7-3.7H5.5c0-3.54 2.87-6.42 6.42-6.42 3.54 0 6.4 2.88 6.4 6.42s-2.86 6.42-6.4 6.42c-1.78 0-3.38-.73-4.54-1.9l-1.3 1.3c1.5 1.5 3.55 2.43 5.83 2.43 4.58 0 8.28-3.7 8.28-8.25 0-4.56-3.7-8.25-8.26-8.25zM11 8.33v4.6l3.92 2.3.66-1.1-3.2-1.9v-3.9H11z" ></path></g></svg>'
    );
    const setting = createMenuOption(
        "Settings",
        '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"  style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.1-1.65c.2-.15.25-.42.13-.64l-2-3.46c-.12-.22-.4-.3-.6-.22l-2.5 1c-.52-.4-1.08-.73-1.7-.98l-.37-2.65c-.06-.24-.27-.42-.5-.42h-4c-.27 0-.48.18-.5.42l-.4 2.65c-.6.25-1.17.6-1.7.98l-2.48-1c-.23-.1-.5 0-.6.22l-2 3.46c-.14.22-.08.5.1.64l2.12 1.65c-.04.32-.07.65-.07.98s.02.66.06.98l-2.1 1.65c-.2.15-.25.42-.13.64l2 3.46c.12.22.4.3.6.22l2.5-1c.52.4 1.08.73 1.7.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.6-.25 1.17-.6 1.7-.98l2.48 1c.23.1.5 0 .6-.22l2-3.46c.13-.22.08-.5-.1-.64l-2.12-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" ></path></g></svg>'
    );
    const help = createMenuOption(
        "Help",
        '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"  style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" ></path></g></svg>'
    );
    container.className = "menu";
    container.append( channel, prem, switchAcc, signOut, line, upload, history, setting, help );
    container.addEventListener( "click", () => {
        if ( event.target.textContent = "Sign Out"){
            localStorage.removeItem("User");
            window.location.href = "./index.html";
        }
    })
    return container;
}

const displayUserIcon = () => {
    const container = document.createElement( "div" );
    const user = isValidUser();
    if ( !user ){
        container.textContent = "SIGN IN";
        container.className = "nav-sign-in";
        addLocationChanger(container, "./login.html")
    } else {
        const div = document.createElement("div");
        div.textContent = user.firstName[0].toUpperCase();
        div.className = "nav-user hover";
        container.className = "show-menu hover";
        container.append ( div, createUserMenu() );
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