import navbar from "../components/navbar.js";


window.addEventListener("load", ()=>{
    document.body.querySelector("nav").append(navbar({ pageTitle: "Upgrade"}))
    quickPicks()
})

function quickPicks(){
    return fetch(`http://localhost:3002/search/album/jubin`)
    .then(response=>{
        return response.json()
    })
    .then(response=>{
        console.log(response)
        displayMyFavourite(response)
    })
    .catch(error=>{
    //    console.log(error) 
    })
}

function displayMyFavourite(response){
    let container = document.getElementById("index1stContainer")
    // container.className = ""
    let innerDiv 
    // console.log(response.content[0].name)
    for(var i=0; i<response.content.length; i++){
        // console.log(response.content[i].name)
        innerDiv = document.createElement("div")
        innerDiv.className = " row col-4 my-2"
        // innerDiv.style.width = "33%"

        const urlDiv = document.createElement("div")
        const url = document.createElement("img")
        url.src = response.content[i].thumbnails[0].url
        url.className = "col-12 "
        urlDiv.className = "col-2 urlspace"
        url.style.height = "48px"
        url.style.width = "58px"
        urlDiv.append(url)

        const divBox = document.createElement("div")
        divBox.className="col-10 row "

        const nameDiv = document.createElement("div")
        nameDiv.innerHTML =response.content[i].name
        nameDiv.className = "col-12 nameDiv"
        
        const artistDiv = document.createElement("div")
        artistDiv.innerHTML = response.content[i].artist
        artistDiv.className = "col-12 text-muted"

        divBox.append(nameDiv, artistDiv)
        innerDiv.append(urlDiv,divBox)
        container.append(innerDiv) 
    }
}




