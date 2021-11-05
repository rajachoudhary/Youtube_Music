import createMusicPlayer from "../components/player.js";

import navbar from "../components/navbar.js";
window.addEventListener("load", ()=>{
    document.body.querySelector("nav").append(navbar({ pageTitle: "Explore"}))
})

let exploreHeading = document.getElementById("exploreHeading");
let newReleases = document.createElement("div");
newReleases.className = "newReleases";
let charts = document.createElement("div");
charts.className = "charts";
let moods = document.createElement("div");
moods.className = "moods";
let newReleasesIcon = document.createElement("div");
newReleasesIcon.className = "newReleasesIcon";
newReleasesIcon.innerHTML = '<svg viewBox="0 0 20 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.56 9.22L23 12l-2.44 2.78.34 3.68-3.61.82-1.89 3.18L12 21l-3.4 1.47-1.89-3.18-3.61-.82.34-3.69L1 12l2.44-2.79-.34-3.68 3.61-.81L8.6 1.54 12 3l3.4-1.46 1.89 3.18 3.61.82-.34 3.68zm-1.81 7.68l-.26-2.79L20.34 12l-1.85-2.11.26-2.79-2.74-.62-1.43-2.41L12 5.18l-2.58-1.1-1.43 2.41-2.74.61.26 2.78L3.66 12l1.85 2.1-.26 2.8 2.74.62 1.43 2.41L12 18.82l2.58 1.11 1.43-2.41 2.74-.62zM12 12.775V7.5h3v2h-2v5a2 2 0 11-2-2c.365 0 .705.105 1 .275z" class="style-scope yt-icon" ></path></g></svg>'
let newReleasesContent = document.createElement("h3");
newReleasesContent.innerHTML = "New releases";
newReleases.append(newReleasesIcon, newReleasesContent);
let chartsIcon = document.createElement("div");
chartsIcon.className = "chartsIcon";
chartsIcon.innerHTML = '<svg  viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" class="style-scope yt-icon"></path></g></svg>';
let chartsContent = document.createElement("h3");
chartsContent.innerHTML = "Charts";
charts.append(chartsIcon, chartsContent);
let moodsIcon = document.createElement("div");
moodsIcon.className = "moodsIcon";
moodsIcon.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" class="style-scope yt-icon"></path></g></svg>';
let moodsContent = document.createElement("h3");
moodsContent.innerHTML = "Moods & genres";
moods.append(moodsIcon, moodsContent);
exploreHeading.append(newReleases, charts, moods);
console.log(document.body);


//newAlbums

async function newAlbums(fun) {
    try {
        let res = await fetch("http://localhost:3002/search/album/new releases hindi albums");
        let data = await res.json();
         console.log(data.content);
        fun(data.content);
        return data.content;
    }
    catch {

    }
}

 function showData(data) {

    let container = document.getElementById("container");
     console.log(data);
    for (let i = 0; i < 10; i += 5) {
        let slideImages = document.createElement("div");

        slideImages.className = "slider";
        for (let j = i; j < i + 5; j++) {
            let div = document.createElement("div");
             div.className = "songsDiv";
            let img = document.createElement("img");



            img.src = data[j].thumbnails[2].url;
            img.className = "newReleasesSongImg";
            let title = document.createElement("p");

            title.innerHTML = data[j].name;
            title.className = "songs";
            let artist = document.createElement("p");
            artist.className = "songs"
            artist.innerHTML = data[j].artist;
             let playImg = document.createElement("div");
            playImg.className = "playImg";
            playImg.style.display = "none";
            playImg.innerHTML='<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M8 5v14l11-7z" class="style-scope yt-icon"></path></g></svg>'
            div.append(img,playImg, title, artist);
            

            let buttonLeft = document.createElement("div");
            let leftBtnImg = document.createElement("img");
            leftBtnImg.id = "leftBtnImg";
            leftBtnImg.src = "https://icons-for-free.com/iconfiles/png/512/arrows+circle+direction+left+prev+previous+icon-1320183137296189943.png"
            buttonLeft.append(leftBtnImg)
            buttonLeft.id = "leftBtn";

            let buttonRight = document.createElement("div");
            let rightBtnImg = document.createElement("img");
            rightBtnImg.id = "rightBtnImg";
            rightBtnImg.src = "https://icons-for-free.com/iconfiles/png/512/arrows+circle+direction+forward+next+right+icon-1320183137084048932.png"
            buttonRight.append(rightBtnImg)
            buttonRight.id = "rightBtn";



            if (j == 4) {
                div.append(buttonRight);

            }
            if (j == 5)
                div.append(buttonLeft)
            slideImages.append(div);
        }
        container.append(slideImages);

    }

     let songsDiv = document.getElementsByClassName("songsDiv");
     let playImg = document.getElementsByClassName("playImg");
    console.log('songsDiv:', songsDiv.length);
     for (let i = 0; i < songsDiv.length; i++)
     {
        songsDiv[i].onmouseover = () => {  
        playImg[i].style.display ="block" ;
         }


         }

      for (let i = 0; i < songsDiv.length; i++)
     {

         songsDiv[i].onmouseleave = () => {
            
             playImg[i].style.display ="none" ;

         }


     }
     for (let k = 0; k < playImg.length; k++) {
         playImg[k].onclick = () => {
             console.log(playImg[k]);
             createMusicPlayer(data[k].name, data[k].thumbnails[2].url, data[k].artist)
         }
     }
     
    let slideIndex = 1;
    showDivs(slideIndex);

    function plusDivs() {
        showDivs(slideIndex);
    }
    function minusDivs() {
        showDivs(slideIndex + 1);
    }

    function showDivs(slideIndex) {
        console.log("Hello");
        let k;
        let divs = document.getElementsByClassName("slider");

        for (k = 0; k < divs.length; k++) {
            divs[k].style.display = "none";
        }
        divs[slideIndex - 1].style.display = "grid";
        console.log("SlideIndex", slideIndex);
    }
    let rightButton = document.getElementById("rightBtn");
    let leftButton = document.getElementById("leftBtn");
    leftButton.onclick = plusDivs;
    rightButton.onclick = minusDivs;

    let songs = document.getElementsByClassName("songs");
    showContainer(songs);
}

newAlbums(showData);

//Moods & genres
let main = document.getElementsByTagName("main")[0];
let moodsHeading = document.createElement("h1");
moodsHeading.innerHTML = "Moods & genres";
moodsHeading.className = "moodsHeading";
main.append(moodsHeading);
// document.body.append(moodsHeading);
let moodsDiv = document.createElement("div");
moodsDiv.className = "moodsDiv";
let Chill = document.createElement("div");
Chill.innerHTML = "Chill";
Chill.className = "moodsDivChild";
let feelGood = document.createElement("div");
feelGood.innerHTML = "Feel Good";
feelGood.className = "moodsDivChild";
let Focus = document.createElement("div");
Focus.innerHTML = "Focus";
Focus.className = "moodsDivChild";
let Workout = document.createElement("div");
Workout.innerHTML = "Workout";
Workout.className = "moodsDivChild";
let Bhojpuri = document.createElement("div");
Bhojpuri.innerHTML = "Bhojpuri";
Bhojpuri.className = "moodsDivChild";
let Decades = document.createElement("div");
Decades.innerHTML = "Decades";
Decades.className = "moodsDivChild";
let Hindi = document.createElement("div");
Hindi.innerHTML = "Hindi";
Hindi.className = "moodsDivChild";
let Commute = document.createElement("div");
Commute.innerHTML = "Commute";
Commute.className = "moodsDivChild";
let Party = document.createElement("div");
Party.innerHTML = "Party";
Party.className = "moodsDivChild";
let African = document.createElement("div");
African.innerHTML = "African";
African.className = "moodsDivChild";
let Classical = document.createElement("div");
Classical.innerHTML = "Classical";
Classical.className = "moodsDivChild";
let Folk = document.createElement("div");
Folk.innerHTML = "Folk & Traditional";
Folk.className = "moodsDivChild";
let hipHop = document.createElement("div");
hipHop.innerHTML = "Hip-Hop";
hipHop.className = "moodsDivChild";
let energyBoost = document.createElement("div");
energyBoost.innerHTML = "Energy Boosters";
energyBoost.className = "moodsDivChild";
let Romance = document.createElement("div");
Romance.innerHTML = "Romance";
Romance.className = "moodsDivChild";
let Arabic = document.createElement("div");
Arabic.innerHTML = "Arabic";
Arabic.className = "moodsDivChild";
let Ghazal = document.createElement("div");
Ghazal.innerHTML = "Ghazal/Sufi";
Ghazal.className = "moodsDivChild";
let Haryanvi = document.createElement("div");
Haryanvi.innerHTML = "Haryanvi";
Haryanvi.className = "moodsDivChild";
let Marathi = document.createElement("div");
Marathi.innerHTML = "Marathi";
Marathi.className = "moodsDivChild";
let Punjabi = document.createElement("div");
Punjabi.innerHTML = "Punjabi";
Punjabi.className = "moodsDivChild";
let Rock = document.createElement("div");
Rock.innerHTML = "Rock";
Rock.className = "moodsDivChild";
let Sleep = document.createElement("div");
Sleep.innerHTML = "Sleep";
Sleep.className = "moodsDivChild";
let Jazz = document.createElement("div");
Jazz.innerHTML = "Jazz";
Jazz.className = "moodsDivChild";
let Gujarati = document.createElement("div");
Gujarati.innerHTML = "Gujarati";
Gujarati.className = "moodsDivChild";
let Tamil = document.createElement("div");
Tamil.innerHTML = "Tamil";
Tamil.className = "moodsDivChild";
let English = document.createElement("div");
English.innerHTML = "English";
English.className = "moodsDivChild";
moodsDiv.append(Chill, Focus, Workout, Bhojpuri, Decades, Hindi, Commute, Party, African, Classical, Folk, hipHop, energyBoost, Romance, Arabic, Ghazal, Haryanvi, Marathi, Punjabi, Rock, Sleep, Jazz, Gujarati, Tamil,English);
main.append(moodsDiv);

let moodsDivChild = document.getElementsByClassName("moodsDivChild");
// console.log(moodsDivChild,0)
for (let i = 0; i < moodsDivChild.length; i++)
{
    if (i % 4 == 0)
        moodsDivChild[i].style.borderLeft = " 5px solid #92a8d1";
    else if (i % 4 == 1)
        moodsDivChild[i].style.borderLeft = " 5px solid rgb(0,165,19)";
     else if (i % 4 == 2)
        moodsDivChild[i].style.borderLeft = " 5px solid rgb(204,0,0)";
     else if (i % 4 == 3)
        moodsDivChild[i].style.borderLeft = " 5px solid rgb(226,75,0)";
    
}

for (let k = 0; k < moodsDivChild.length; k++)
{
    moodsDivChild[k].onclick = () => {
        main.style.display = "none";
        let heading = document.createElement("h3");
        heading.innerHTML = moodsDivChild[k].innerHTML;
      
        let featPlay = document.createElement("h3");
        featPlay.innerHTML = "Featured playlists";
        featPlay.id = "moodsPlay";
        document.body.append(heading, featPlay);
          heading.id = "moodsTitle";
        let title = heading.innerHTML;
        console.log(title);
        async function newMoods(title) {
    try {
        let res = await fetch(`http://localhost:3002/search/playlist/${title}`);
        let data = await res.json();
        console.log(data.content);
        createPlaylist(data.content);
        // return data.content;
    }
    catch {

    }
        }
        newMoods(title);
          function createPlaylist(data)
    {
              let createDiv = document.createElement("div");
              createDiv.className = "createPlaylistDiv";
              for (var i = 0; i < data.length; i++)
              {
                  let playListChild = document.createElement("div");
                  playListChild.className = "playListChild";
                    let playButton = document.createElement("div");
            playButton.className = "playButton";
            playButton.style.display = "none";
            playButton.innerHTML='<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M8 5v14l11-7z" class="style-scope yt-icon"></path></g></svg>'
                 
                  let img = document.createElement("img");
                  img.src = data[i].thumbnails[2].url;
                  let author = document.createElement("p");
                  author.innerHTML = data[i].author;
                  let titlePlayList = document.createElement("p");
                  titlePlayList.innerHTML = data[i].title;
                 
                  playListChild.append(img,titlePlayList,author,playButton);
                  createDiv.appendChild(playListChild);
              }
              document.body.append(createDiv);
              let playListChild = document.getElementsByClassName("playListChild");
              let playButton = document.getElementsByClassName("playButton");
              for (let j = 0; j < playListChild.length; j++)
              {
                
                  playListChild[j].onmouseenter = () => {
                   
                         playButton[j].style.display = "block";
                  }
              }
              
                for (let j = 0; j < playListChild.length; j++)
              {
                   playListChild[j].onmouseleave = () => {
                        playButton[j].style.display ="none" ;
                  }
                  }
    }
    }
    
}