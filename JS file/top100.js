import navbar from "../components/navbar.js";
import createMusicPlayer from "../components/player.js";
window.addEventListener("load", ()=>{
    document.body.querySelector("nav").append(navbar({ pageTitle: ""}))
    top100()
})

function top100() {
    return fetch(`http://localhost:3002/playlist/PL4fGSI1pDJn40WjZ6utkIuj2rNg-7iGsq`)
    .then (response=>{
        return response.json()
    })
    .then (response =>{
        console.log(response)
        gettop100Music(response)
    })
    .catch(err =>{
        ////error
    })
}

function gettop100Music(response){
    const top100MusicContainer = document.getElementById("top-100Songs-container")
    let subContainer ;
    let totalMin = 0
    let count = 1
    for(var i=0; i<response.content.length; i++){
        subContainer = document.createElement("div")  
        subContainer.className = "row "

        const urlDiv = document.createElement("div")
        urlDiv.className="col-1 row"
        const url = document.createElement("img")
        url.src = response.content[i].thumbnails.url ; 
        url.style.height = "20px"
        url.style.width = "50px"
        url.className = "col-1"
        
        const countDiv = document.createElement("div")
        countDiv.innerHTML = count++
        countDiv.className = "col-3"
        urlDiv.append(url,countDiv)
        const songName = document.createElement("div")
        songName.innerHTML = response.content[i].name
        songName.className = "col-4 songName"
        
        const authorDiv = document.createElement("div")
        if (response.content[i].author.name!=undefined){
            authorDiv.innerHTML = response.content[i].author.name
        }  else if (response.content[i].author.length != 0){
            authorDiv.innerHTML = response.content[i].author[0].name + response.content[i].author[1].name
        } 
        authorDiv.className = "col-5 authorName"
        
        const time = document.createElement("div");
        const min = Math.floor((response.content[i].duration) / 1000 / 60);
        // totalMin += min;
        let second = (response.content[i].duration) / 1000 - min * 60;
        if (second < 10)
        second = `0${second}`;
        
        time.innerHTML = `${min}:${second}`;
        time.className = "col-2 justify-content-end d-flex"

        const hr = document.createElement("hr")
        hr.className = "row container my-3"

        subContainer.append(urlDiv,songName,authorDiv,time,hr)
        top100MusicContainer.appendChild(subContainer)

        subContainer.addEventListener("click",()=>{
            createMusicPlayer(songName.innerHTML,url.src,authorDiv.innerHTML)
        })

    }
    
}