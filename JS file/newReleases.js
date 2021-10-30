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

            let img = document.createElement("img");



            img.src = data[j].thumbnails[2].url;
            img.className = "newReleasesSongImg";
            let title = document.createElement("p");

            title.innerHTML = data[j].name;
            title.className = "songs";
            let artist = document.createElement("p");
            artist.className = "songs"
            artist.innerHTML = data[j].artist;
            div.append(img, title, artist);

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

function showContainer(container, hideDiv) {

    for (let i = 0; i < container.length; i++) {
        container[i].onclick = () => {

            console.log(hideDiv);
            if (hideDiv != undefined) {
                hideDiv.style.display = "none";
            }
            fetchPlaylist(container[i].innerHTML, "main");
        }

    }

}
async function fetchPlaylist(artist, target) {
    //  console.log(this.innerHTML);
    let relatedSongs = await fetch(`http://localhost:3002/search/song/${artist}`);
    let getPlaylist = await relatedSongs.json();
    let content = getPlaylist.content;
    console.log(getPlaylist);
    let previousLayout = document.getElementsByTagName(target)[0];
    previousLayout.style.display = "none";

    let playlistDisplay = document.createElement("div");
    for (let i = 0; i < content.length; i++) {
        let divSongs = document.createElement("div");
        divSongs.className = "divsongs";
        let img = document.createElement("img");
        img.src = content[i].thumbnails[0].url;
        let title = document.createElement("p");
        title.innerHTML = content[i].name;
        let duration = document.createElement("p");
        //  let min = Math.floor((content[i].duration % 3600)/60);
        //  let second = content[i].duration % 60;
        //  duration.innerHTML = `${min}:${second}`;

        divSongs.append(img, title);
        let whiteLine = document.createElement("div");
        whiteLine.className = "whiteLine";
        playlistDisplay.append(divSongs, whiteLine);
    }

    document.body.append(playlistDisplay);
    document.body.className = "afterClick"
    //  console.log(body.innerHTML)
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
    showContainer(songs, displayAll);


}