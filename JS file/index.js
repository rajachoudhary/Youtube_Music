
import navbar from "../components/navbar.js";
import createMusicPlayer from "../components/player.js";

var count = 1;
window.addEventListener("load", async()=>{
    document.body.querySelector("nav").append(navbar({ pageTitle: "Home"}))
   const res1 = await quickPicks("arjit")

   
  

   displayMyFavourite({...res1})

    // quickPicks("jubin")
})

function quickPicks(value){
    return fetch(`http://localhost:3002/search/album/${value}`)
    .then(response=>{
        return response.json()
    })
    // .then(response=>{
        // console.log(response)
    // //     // displayMyFavourite(response)
    //     arr.push(response)
    // })
    .catch(error=>{
    //    console.log(error) 
    })
}
    
function displayMyFavourite(response){
    
    let left = document.getElementById("leftButton2")
    left.addEventListener("click", leftButton1)

    let right = document.getElementById("rightButton1")
    right.addEventListener("click", rightButton1)

    onloadData(response)    
    
    function leftButton1(){
       
        leftButton(response)
    }

    function rightButton1(){
    //    console.log("right")
        rightButton(response)
    }
   
}

function onloadData(response){
    let container = document.getElementById("index1stContainer")
    let innerDiv;
    let divForButton1;
    for(var i=0; i<response.content.length; i++){
        let container1 = document.getElementById("container1")
        
       
        if(i<12){ 
           
            const leftButton2 = document.getElementById("leftButton2")
            leftButton2.style.display = "none"
            
            divForButton1 = document.createElement("div")
            divForButton1.className = "col-4 forPlay"
           
            divForButton1.style.height = "65px"
            innerDiv = document.createElement("div")
            innerDiv.className = " row  my-2 "

            const urlDiv = document.createElement("div")
            const url = document.createElement("img")
            url.src = response.content[i].thumbnails[0].url
            urlDiv.className = "col-2 urlspace"
            url.style.height = "48px"
            url.style.width = "48px"
            urlDiv.append(url)

            const divBox = document.createElement("div")
            divBox.className="col-10 row "

            const nameDiv = document.createElement("div")
            nameDiv.textContent =response.content[i].name 

            nameDiv.className = "col-12 nameDiv innerDiv"
            
            const artistDiv = document.createElement("div")
            artistDiv.innerHTML = response.content[i].artist
            artistDiv.className = "col-12 text-muted innerDiv"

            divBox.append(nameDiv, artistDiv)
            innerDiv.append(urlDiv,divBox)
            
            divForButton1.append(innerDiv)
            divForButton1.addEventListener("click", ()=>{
                createMusicPlayer(nameDiv.textContent,url.src,artistDiv.textContent)
            })
            container1.append(divForButton1)
            container.append(container1)
            
        }   
    }
}

function rightButton(response){
    let container = document.getElementById("index1stContainer")
    let innerDiv;
    let divForButton1;
    let container1 = document.getElementById("container1")
    container1.innerHTML = ""
    for(var i=0; i<response.content.length; i++){
        if(i>11){ 
            // createMusicPlayer(response.content[i].name,response.content[i].thumbnails[0].url,response.content[i].artist )
            const leftButton2 = document.getElementById("leftButton2")
            leftButton2.style.display = "block"
            const rightButton1 = document.getElementById("rightButton1")
            rightButton1.style.display = "none"

            divForButton1 = document.createElement("div")
            divForButton1.className = "col-4 forPlay"
            divForButton1.style.height = "65px"
            innerDiv = document.createElement("div")
            innerDiv.className = " row  my-2 "

            const urlDiv = document.createElement("div")
            const url = document.createElement("img")
            url.src = response.content[i].thumbnails[0].url
            urlDiv.className = "col-2 urlspace"
            url.style.height = "48px"
            url.style.width = "48px"
            urlDiv.append(url)

            const divBox = document.createElement("div")
            divBox.className="col-10 row "

            const nameDiv = document.createElement("div")
            nameDiv.textContent =response.content[i].name 
            

            nameDiv.className = "col-12 nameDiv innerDiv"
            
            const artistDiv = document.createElement("div")
            artistDiv.innerHTML = response.content[i].artist
            artistDiv.className = "col-12 text-muted innerDiv"

            divBox.append(nameDiv, artistDiv)
            innerDiv.append(urlDiv,divBox)
            
            divForButton1.append(innerDiv)
            divForButton1.addEventListener("click", ()=>{
                createMusicPlayer(nameDiv.textContent,url.src,artistDiv.textContent)
            })
            container1.append(divForButton1)
            
            container.append(container1)
        }   
    }
}

function leftButton(response){
    let container = document.getElementById("index1stContainer")
    let innerDiv;
    let divForButton1;
    
    let container1 = document.getElementById("container1")
    container1.innerHTML = ""  
    for(var i=0; i<response.content.length; i++){
        const rightButton1 = document.getElementById("rightButton1")
        rightButton1.style.display = "block"
        const leftButton2 = document.getElementById("leftButton2")
        leftButton2.style.display = "none"
        if(i<12){
            // createMusicPlayer(response.content[i].name,response.content[i].thumbnails[0].url,response.content[i].artist )
            divForButton1 = document.createElement("div")
            divForButton1.className = "col-4 forplay"
           
            divForButton1.style.height = "65px"
            innerDiv = document.createElement("div")
            innerDiv.className = " row  my-2 "
           
            const urlDiv = document.createElement("div")
            const url = document.createElement("img")
            url.src = response.content[i].thumbnails[0].url
            // console.log(response.content[i].thumbnails[0].url )
            urlDiv.className = "col-2 urlspace"
            url.style.height = "48px"
            url.style.width = "48px"
            urlDiv.append(url)

            const divBox = document.createElement("div")
            divBox.className="col-10 row "

            const nameDiv = document.createElement("div")
            nameDiv.innerHTML =response.content[i].name + "raight"
            nameDiv.className = "col-12 nameDiv innerDiv"
            // console.log(response.content[i].name )
            const artistDiv = document.createElement("div")
            artistDiv.innerHTML = response.content[i].artist
            artistDiv.className = "col-12 text-muted innerDiv"

            divBox.append(nameDiv, artistDiv)
            innerDiv.append(urlDiv,divBox)
            
            divForButton1.append(innerDiv)
            divForButton1.addEventListener("click", ()=>{
                createMusicPlayer(nameDiv.textContent,url.src,artistDiv.textContent)
            })
            container1.append(divForButton1)
            container.append(container1)
            
        }
        
    }
   
}

const top100Songs = document.getElementById("top100Songs")
top100Songs.addEventListener("click", ()=>{
    window.location.assign("../html file/top100.html")
})


