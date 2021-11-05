import createMusicPlayer from "../components/player.js";

async function newReleases(fun) {
    try {
        let res = await fetch("http://localhost:3002/search/album/new%20releases%20hindi");
        let data = await res.json();
        //  console.log(data.content);
        fun(data.content);
        return data.content;
    }
    catch {

    }
}

function showData(data) {

    let container = document.getElementById("container");

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
     for (let k = 0; k < songsDiv.length; k++)
     {

         songsDiv[k].onmouseover = () => {
             playImg[k].style.display ="block" ;

         }
         }

      for (let i = 0; i < songsDiv.length; i++)
     {
         songsDiv[i].onmouseleave = () => { 
             playImg[i].style.display ="none" ;
         }
         }

     for (let k = 0; k < playImg.length; k++)
     {
         playImg[k].onclick = () => {
             console.log(playImg[k]);
             createMusicPlayer(data[k].name,data[k].thumbnails[2].url,data[k].artist)
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

newReleases(showData);

function showContainer(container, hideDiv,heading) {

    for (let i = 0; i < container.length; i++) {
        container[i].onclick = () => {

            // console.log(hideDiv);
            if (hideDiv != undefined) {
                hideDiv.style.display = "none";
            }
            if (heading != undefined)
            {
                heading.style.display = "none";
                }
            fetchPlaylist(container[i].innerHTML, "main");
        }

    }

}
async function fetchPlaylist(artistname, target) {
    //  console.log(this.innerHTML);
    let relatedSongs = await fetch(`http://localhost:3002/search/song/${artistname}`);
    let getPlaylist = await relatedSongs.json();
    let content = getPlaylist.content;
    console.log(content[0])
    let previousLayout = document.getElementsByTagName(target)[0];
    previousLayout.style.display = "none";

    let playlistDisplay = document.createElement("div");
    playlistDisplay.className = "playListDisplay";

    let playListHeadingDiv = document.createElement("div");
     let playlistTitleDiv = document.createElement("div");
    let playlistTitleDivImg = document.createElement("img");
    playlistTitleDivImg.src = content[0].thumbnails[1].url;
    playlistTitleDiv.append(playlistTitleDivImg);
    
    let playlistTitleContent = document.createElement("div");
    let playlistTitleContentHeading = document.createElement("h1");
    playlistTitleContentHeading.innerHTML = content[0].album.name;

   
    //play Button

    let playlistTitleContentDuration = document.createElement("p");
    let playButton = document.createElement("button");
    playButton.id = "playButton";
     let playButtonContent = document.createElement("i");
    playButtonContent.className = "fa fa-play";
    playButtonContent.innerHTML = "&nbsp&nbsp&nbsp&nbspPLAY";
    playButton.append(playButtonContent);

    //addToLibrary

    let addToLibrary = document.createElement("button");
    addToLibrary.id = "addToLibrary";
    let addLibraryContent = document.createElement("i");
    addLibraryContent.className = "fa fa-plus-square";
    addLibraryContent.innerHTML = "&nbsp&nbsp&nbsp&nbspADD TO LIBRARY";
    addToLibrary.append(addLibraryContent);
    // addToLibrary.innerHTML = "";
    playlistTitleContent.append(playlistTitleContentHeading, playlistTitleContentDuration, playButton, addToLibrary);
    playListHeadingDiv.append(playlistTitleDiv, playlistTitleContent);
    playListHeadingDiv.id = "playListHeadingDiv";
    playlistDisplay.append(playListHeadingDiv);
    

    let totalMin = 0;
    for (let i = 0; i < content.length; i++) {
        let divSongs = document.createElement("div");
        let serialNumber = document.createElement("p");
        serialNumber.innerHTML = i + 1.
        serialNumber.className = "serialNumber";
       
        divSongs.className = "divsongs";

        let img = document.createElement("img");
        img.src = content[i].thumbnails[0].url;
        let title = document.createElement("p");
        title.innerHTML = content[i].name;
       

        let duration = document.createElement("p");
        let min = Math.floor((content[i].duration) / 1000 / 60);
        totalMin += min;
        let second = (content[i].duration) / 1000 - min * 60;
        if (second < 10)
            second = `0${second}`;
        
        duration.innerHTML = `${min}:${second}`;
        let like = document.createElement("div");
        like.className = "like";
        like.innerHTML='<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope tp-yt-iron-icon"><path d="M9 21h9c.8 0 1.5-.5 1.8-1.2l3-7.3c.1-.2.2-.4.2-.7V9.7c0-1.1-.9-2.1-2-2.1h-6.3l1-4.7v-.3c0-.4-.2-.8-.4-1.1-.6-.6-1.5-.5-2.1.1L7.6 7.3c-.4.4-.6.9-.6 1.4V19c0 1.1.9 2 2 2zm.3-12.6l3.5-3.6c.2-.2.5 0 .4.2l-1 4.7H20c.6 0 1 .5 1 1v1l-2.7 6.7c-.2.3-.6.6-1 .6H10c-.6 0-1-.5-1-1V9.2c0-.4.1-.6.3-.8zM5 21H1V9h4v12z" class="style-scope tp-yt-iron-icon"></path></g></svg>'
        // like.className = "fa fa-thumbs-up";
        like.style.display = "none";

         let disLike = document.createElement("i");
        disLike.className = "dislike";
        disLike.innerHTML='<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope tp-yt-iron-icon"><path d="M14.9 3H6c-.8 0-1.5.5-1.8 1.2l-3 7.3c-.1.2-.2.4-.2.7v2c0 1.1.9 2 2 2h6.3l-1 4.7v.3c0 .4.2.8.4 1.1.6.7 1.5.7 2.1.1l5.5-5.7c.4-.4.6-.9.6-1.4V5c0-1.1-.9-2-2-2zm-.2 12.6l-3.5 3.6c-.2.2-.5 0-.4-.2l1-4.6H4c-.6 0-1-.5-1-1v-1.1l2.7-6.6c.2-.5.6-.7 1-.7H14c.5 0 1 .5 1 1v8.8c-.1.3-.2.6-.3.8zM19 3h4v12h-4V3z" class="style-scope tp-yt-iron-icon"></path></g></svg>'
        disLike.style.display = "none";

        divSongs.append(serialNumber, img, title,duration,like,disLike);
        let whiteLine = document.createElement("div");
        whiteLine.className = "whiteLine";
        playlistDisplay.append(divSongs, whiteLine);
        

        
    }
    console.log("Total Min", totalMin);
    playlistTitleContentDuration.innerHTML = `20 songs . ${totalMin} minutes`;
      document.body.append(playlistDisplay);
    document.body.className = "afterClick"
    let divSongs = document.getElementsByClassName("divsongs");
    let like = document.getElementsByClassName("like");
    let disLike = document.getElementsByClassName("dislike");
    let serialNumber = document.getElementsByClassName("serialNumber");
    //show like and dislike button on hover

         for (let j = 0; j < divSongs.length; j++)
         {
             divSongs[j].onmouseover = () => {
                 like[j].style.display = "inline";
                 disLike[j].style.display = "inline"; 
             }
        //       divSongs[j].onclick = () => {
        //     if (content[j].artist.name != undefined)
        // {
        //     var artistName = content[j].artist.name;  
        //     }
        // else if(content[j].artist.length!=0)
        // {
        //         var artistName = content[j].artist[0].name;
        //           }
        //            console.log("title",content[j].name);
        //  createMusicPlayer(content[j].name, content[j].thumbnails[0].url, artistName);
        //     }
    }
    //disable like and dislike button on mouseout
    
      for (let j = 0; j < divSongs.length; j++)
         {
             divSongs[j].onmouseout = () => {
                 like[j].style.display = "none";
                 disLike[j].style.display = "none";
               
            }
    }
    
}

let all = document.getElementById("newRelAll");
all.onclick = () => {
    newReleases(showAllData);
}


function showAllData(data) {
    let main = document.getElementsByTagName("main")[0];
    main.style.display = "none";
    let displayAll = document.createElement("div");
    displayAll.id = "displayAll";
    displayAll.className = "slider";
    let newRelHeading = document.createElement("h1");
    newRelHeading.id = "allHeading";
    newRelHeading.innerHTML = "New releases";
    document.body.append(newRelHeading);
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.src = data[i].thumbnails[2].url;
        let title = document.createElement("p");

        title.innerHTML = data[i].name;
        title.className = "songs";
        let artist = document.createElement("p");
        artist.className = "songs"
        artist.innerHTML = data[i].artist;
        div.append(img, title, artist);
        displayAll.append(div);
        displayAll.id = "displayAll";
        console.log(displayAll);
    }

    document.body.append(displayAll);
    let songs = document.getElementsByClassName("songs");
    showContainer(songs, displayAll,newRelHeading);


}
let divSongs = document.getElementsByClassName("divSongs");
console.log(divSongs);
if (divSongs != undefined)
{
    console.log("Kem che");
}