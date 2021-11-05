const fetchSuggestions = (q) => {
    const url = `http://localhost:3002/suggestions/${q}`;
    return fetch(url)
        .then( res => res.json() ) 
}

const debouncer = (fun, delay) => {
    let id;
    return () => {
        id && clearTimeout(id);
        id = setTimeout( () => {
            fun();
        }, delay )
    }
}


const createSuggestCard = (item) => {
    const suggestElem = document.createElement("div");
    const div = document.createElement("div");
    const searchIcon = document.createElement("div");
    
    searchIcon.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" ></path></g></svg>';
    div.textContent = item;
    div.className = "suggest-text"
    
    suggestElem.className = "suggest";
    
    suggestElem.append( searchIcon, div );
    suggestElem.addEventListener("keyup", () => {
        if ( event.code == "Enter" ){
            localStorage.setItem("q", div.textContent);
            window.location.href = "./search.html";
        }
        event.stopImmediatePropagation();
    });
    return suggestElem;        
}

const displaySuggestion = async () => {
    try {
        const container = document.getElementById("suggestions");
        const input = document.getElementsByClassName("search-bar")[0].querySelector("input").value;
        if ( !input ){
            container.style.display = "none";
            return;
        }
        const suggestion = await fetchSuggestions(input);
        const frag = new DocumentFragment();
        for ( const item of suggestion ){
            const suggestElem = createSuggestCard(item);
            suggestElem.tabIndex = "0";
            frag.append( suggestElem );
        }
        container.innerHTML = ""
        container.append(frag);
        container.style.display = "block";
    } catch ( err ) {
        console.log( err );
    }
}

const suggestionDebouncer = debouncer( displaySuggestion, 300 );

const handleInput = () => {
    if ( event.code == "Enter" ){
        const suggests = document.getElementsByClassName("suggest");
        const q = document.getElementsByClassName("search-bar")[0].querySelector("input").value;
        if ( q.length < 1 ){
            return;
        }
        localStorage.setItem("q", q);
        window.location.href = "./search.html";
        event.stopImmediatePropagation();
    } else if ( event.code !== "Tab" ) {

        suggestionDebouncer();
    }
}


const displaySearchBar = () => {
    let searchBar = document.getElementsByClassName("search-bar");
    if ( searchBar[0] ){
        searchBar[0].style.display = "block";
        return;
    }
    const container = document.getElementsByClassName("navbar")[0];
    const searchBa = document.createElement("div");
    const backBtn = document.createElement("button");
    const input = document.createElement("input");
    const suggestion = document.createElement("div");

    backBtn.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g mirror-in-rtl="" ><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g></svg>'
    backBtn.value = "back";
    input.placeholder = "Search";

    searchBa.className = "flex search-bar";
    suggestion.id = "suggestions";

    searchBa.append( backBtn, input, suggestion );
    
    container.addEventListener("click", () => {
        if ( event.target.value == "back" ){
            const searchb = document.getElementsByClassName("search-bar")[0];
            searchb.style.display = "none";
        } else if ( event.target.className == "suggest-text"){
            const input = document.getElementsByClassName("search-bar")[0].querySelector("input");
            input.value = event.target.textContent;
            localStorage.setItem("q", input.value);
            window.location.href = "./search.html";
        }
    });
    
    container.addEventListener( "keyup", handleInput);

    container.append( searchBa );
}



export default displaySearchBar;