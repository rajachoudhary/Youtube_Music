import loadingIndicator from "./loadingIndicator.js";

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

const nameConverter = (s) => {
    if ( s.length > 78 ){
        s = s.slice(0, 75) + "...";
    }
    return s;
}

const menuOption = () => {
    const container = document.createElement("div");
    const cont = document.createElement("div");
    const like = document.createElement("div");
    const dislike = document.createElement("div");
    const menu = document.createElement("div");
    const cont2 = document.createElement("div");
    const sound = document.createElement("div");
    const repeat = document.createElement("div");
    const mix = document.createElement("div");
    const up = document.createElement("div");

    like.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M9 21h9c.8 0 1.5-.5 1.8-1.2l3-7.3c.1-.2.2-.4.2-.7V9.7c0-1.1-.9-2.1-2-2.1h-6.3l1-4.7v-.3c0-.4-.2-.8-.4-1.1-.6-.6-1.5-.5-2.1.1L7.6 7.3c-.4.4-.6.9-.6 1.4V19c0 1.1.9 2 2 2zm.3-12.6l3.5-3.6c.2-.2.5 0 .4.2l-1 4.7H20c.6 0 1 .5 1 1v1l-2.7 6.7c-.2.3-.6.6-1 .6H10c-.6 0-1-.5-1-1V9.2c0-.4.1-.6.3-.8zM5 21H1V9h4v12z"></path></g></svg>';
    dislike.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M14.9 3H6c-.8 0-1.5.5-1.8 1.2l-3 7.3c-.1.2-.2.4-.2.7v2c0 1.1.9 2 2 2h6.3l-1 4.7v.3c0 .4.2.8.4 1.1.6.7 1.5.7 2.1.1l5.5-5.7c.4-.4.6-.9.6-1.4V5c0-1.1-.9-2-2-2zm-.2 12.6l-3.5 3.6c-.2.2-.5 0-.4-.2l1-4.6H4c-.6 0-1-.5-1-1v-1.1l2.7-6.6c.2-.5.6-.7 1-.7H14c.5 0 1 .5 1 1v8.8c-.1.3-.2.6-.3.8zM19 3h4v12h-4V3z"></path></g></svg>';
    menu.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g></svg>';
    sound.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></g></svg>';
    repeat.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M3 6.929c0-.75.643-1.393 1.393-1.393h14.286L16.32 3.179 17.5 2l4.393 4.393-4.393 4.393-1.179-1.179L18.68 7.25H4.714V11H3V6.929zM2.107 17.607L6.5 13.214l1.179 1.179L5.32 16.75l13.965-.071v-3.965H21V17c0 .75-.643 1.393-1.393 1.393l-14.286.071 2.358 2.357L6.5 22l-4.393-4.393z"></path></g></svg>';
    mix.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M16.808 4.655l2.069 1.978h-.527c-1.656 0-3.312.68-4.458 1.814L12.797 9.75l1.179 1.246 1.317-1.527c.764-.794 1.91-1.247 3.057-1.247h.55l-2.07 2.014 1.178 1.179 4.005-3.993-4.026-3.945-1.178 1.179zm1.974 10.998l-1.974-1.888 1.18-1.179 4.024 3.945-4.004 3.993-1.178-1.179 1.954-1.901h-.434c-1.656 0-3.312-.625-4.458-1.667L8.242 9.8C7.35 9.071 6.204 8.55 4.93 8.55H2l.006-1.794 2.965.003c1.784 0 3.312.521 4.459 1.563l5.904 6.185c.765.73 1.911 1.146 3.058 1.146h.39zm-9.02-2.092l-1.52 1.394c-.892.793-2.038 1.36-3.312 1.36H2v1.588h2.93c1.783 0 3.312-.567 4.459-1.701l1.537-1.396-1.164-1.245z"></path></g></svg>';
    up.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M7 10l5 5 5-5z"></path></g></svg>';

    cont.className = "cont-1";
    cont2.className = "cont-2";
    up.className = "up";
    container.className = "extra";
    like.classList.add("l1");
    dislike.classList.add("l2");


    sound.addEventListener( "click", () => {
        const audio = document.getElementById("audio");
        audio.muted = !audio.muted;
        if ( audio.muted ){
            sound.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path></g></svg>';
        } else {
            sound.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></g></svg>';
        }
    })

    dislike.addEventListener( "click", () => {
        if ( !dislike.classList[1] ){
            dislike.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope tp-yt-iron-icon"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" class="style-scope tp-yt-iron-icon"></path></g></svg>';
            like.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M9 21h9c.8 0 1.5-.5 1.8-1.2l3-7.3c.1-.2.2-.4.2-.7V9.7c0-1.1-.9-2.1-2-2.1h-6.3l1-4.7v-.3c0-.4-.2-.8-.4-1.1-.6-.6-1.5-.5-2.1.1L7.6 7.3c-.4.4-.6.9-.6 1.4V19c0 1.1.9 2 2 2zm.3-12.6l3.5-3.6c.2-.2.5 0 .4.2l-1 4.7H20c.6 0 1 .5 1 1v1l-2.7 6.7c-.2.3-.6.6-1 .6H10c-.6 0-1-.5-1-1V9.2c0-.4.1-.6.3-.8zM5 21H1V9h4v12z"></path></g></svg>';
            like.classList.remove("like");
            dislike.classList.add('dislike');
        } else {
            dislike.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M14.9 3H6c-.8 0-1.5.5-1.8 1.2l-3 7.3c-.1.2-.2.4-.2.7v2c0 1.1.9 2 2 2h6.3l-1 4.7v.3c0 .4.2.8.4 1.1.6.7 1.5.7 2.1.1l5.5-5.7c.4-.4.6-.9.6-1.4V5c0-1.1-.9-2-2-2zm-.2 12.6l-3.5 3.6c-.2.2-.5 0-.4-.2l1-4.6H4c-.6 0-1-.5-1-1v-1.1l2.7-6.6c.2-.5.6-.7 1-.7H14c.5 0 1 .5 1 1v8.8c-.1.3-.2.6-.3.8zM19 3h4v12h-4V3z"></path></g></svg>';
            dislike.classList.remove("dislike");
        }
    })

    like.addEventListener( "click", () => {
        if ( !like.classList[1] ){
            dislike.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M14.9 3H6c-.8 0-1.5.5-1.8 1.2l-3 7.3c-.1.2-.2.4-.2.7v2c0 1.1.9 2 2 2h6.3l-1 4.7v.3c0 .4.2.8.4 1.1.6.7 1.5.7 2.1.1l5.5-5.7c.4-.4.6-.9.6-1.4V5c0-1.1-.9-2-2-2zm-.2 12.6l-3.5 3.6c-.2.2-.5 0-.4-.2l1-4.6H4c-.6 0-1-.5-1-1v-1.1l2.7-6.6c.2-.5.6-.7 1-.7H14c.5 0 1 .5 1 1v8.8c-.1.3-.2.6-.3.8zM19 3h4v12h-4V3z"></path></g></svg>';
            like.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope tp-yt-iron-icon"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" class="style-scope tp-yt-iron-icon"></path></g></svg>';
            dislike.classList.remove("dislike");
            like.classList.add('like');
        } else {
            like.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M9 21h9c.8 0 1.5-.5 1.8-1.2l3-7.3c.1-.2.2-.4.2-.7V9.7c0-1.1-.9-2.1-2-2.1h-6.3l1-4.7v-.3c0-.4-.2-.8-.4-1.1-.6-.6-1.5-.5-2.1.1L7.6 7.3c-.4.4-.6.9-.6 1.4V19c0 1.1.9 2 2 2zm.3-12.6l3.5-3.6c.2-.2.5 0 .4.2l-1 4.7H20c.6 0 1 .5 1 1v1l-2.7 6.7c-.2.3-.6.6-1 .6H10c-.6 0-1-.5-1-1V9.2c0-.4.1-.6.3-.8zM5 21H1V9h4v12z"></path></g></svg>';
            like.classList.remove("like");
        }
    })

    cont.append( dislike, like, menu );
    cont2.append( sound, repeat, mix, up );
    container.append(cont, cont2)
    return container;
}

const doesFileExist = async ( urlToFile ) => {
    try {
        const res = await fetch(urlToFile);
        if ( res.status == 200 ) {
            return true;
        } else {
            return false;
        }
    } catch ( err ) {
        console.log(err);
    }
}

const setSrc = ( audio, path, play, isDownloaded ) => {
    audio.src = path;
    audio.play();
    play.innerHTML = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></g></svg>`;
    loadingIndicator("play", false);
    play.addEventListener('click', () => {
        if( audio.paused ){
            audio.play();
            play.innerHTML = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></g></svg>`
        } else {
            audio.pause();
            play.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M8 5v14l11-7z"></path></g></svg>'
        }
    });
    let count = 0;
    if ( !isDownloaded ) {
        const id = setInterval( () => {
            const a = audio.currentTime;
            const state = audio.paused;
            const play = document.getElementById("play");
            audio.pause();
            audio.load();
            count++;
            if ( count > 15 ) clearInterval(id);
            if ( !state ){
                audio.play();
                play.innerHTML = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></g></svg>`
            } else {
                play.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M8 5v14l11-7z"></path></g></svg>'
            }
            audio.currentTime = a + 0.015;
        }, 20000);
    }
}

/**
 * e.g. createMusicPlayer("hey mama", "https://lh3.googleusercontent.com/lBXavpTPsNvUx2g_i36AsfiaKLPLfV07iuX-0cBZ0CHXhb_08LejsWLiLca2i9XVFVwmS-8IDawiUdw=w60-h60-l90-rj", "David Guetta")
 * @param {String} name name of song 
 * @param {String} img url of image
 * @param {String} artist name of artist
 */
const createMusicPlayer = async ( name, img, artist ) => {
    try {
        let flag = true;
        const path = `../audio/${name}.mp3`;

        if ( ! ( await doesFileExist(path) ) ){
            fetch(`http://localhost:3002/download/${name}`);
            flag = false;
        }
        let container = document.getElementById("music-player");
        if ( !container ){
            container = document.createElement("div");
        } else {
            container.innerHTML = "";
        }
        const musicSlider = document.createElement("div");
        const btns = document.createElement("div");
        const prev = document.createElement("div");
        const play = document.createElement("div");
        const next = document.createElement("div");
        const meta = document.createElement("div");
        const texts = document.createElement("div");
        const nameCont = document.createElement("div");
        const artistCont = document.createElement("div");
        const time = document.createElement("div");
        const image = document.createElement("img");
        const range = document.createElement("input");
        const audio = document.createElement("audio");
        
        prev.innerHTML = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></g></svg>`;
        next.innerHTML = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></g></svg>`;
        nameCont.textContent = nameConverter(name);
        artistCont.textContent = artist;
        image.src = img;

        range.type = "range";
        range.value = 0;
        range.className = "seek-bar";

        musicSlider.append(range);
        musicSlider.className = "music-slider";
        audio.id = "audio";
        nameCont.id = "player-name";
        btns.className = "btns";
        prev.className = "ctrl-btn prev";
        prev.id = "prev";
        play.className = "ctrl-btn play";
        play.id = "play";
        next.className = "ctrl-btn next";
        next.id = "next";

        time.className = "time";
        meta.className = "meta";
        texts.className = "texts";

        texts.append( nameCont, artistCont );
        meta.append(image, texts);
        btns.append( prev, play, next)
        container.append( audio, musicSlider, btns, time, meta, menuOption() );
        container.id = "music-player";
        

        setInterval( () => {
            range.max = audio.duration;
        }, 10000);

        setInterval(() => {
            range.value = audio.currentTime;
            if( Math.floor(audio.currentTime) == Math.floor(range.max) ){
                range.value = 0;
                play.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g ><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></g></svg>'
            }
        }, 1000);

        setInterval( () => {
            let cur = audio.currentTime;
            let max = audio.duration;
            if ( !audio.duration ){
                cur = 0;
                max = 0;
            }
            time.textContent = `${formatTime( cur )} / ${ formatTime( max ) }`
        }, 500);
        
        range.addEventListener('change', () => {
            audio.currentTime = range.value;
        });

        prev.addEventListener("click", () => {
            if ( audio.currentTime <= 5 ){
                return;
            } else {
                audio.currentTime -= 5;
            };
        })

        next.addEventListener("click", () => {
            if ( audio.currentTime >= audio.duration - 5 ){
                return;
            } else {
                audio.currentTime += 5;
            };
        })

        document.body.append(container);

        loadingIndicator("play", true);
        if ( flag ) {
            setSrc(audio, path, play, flag);
        } else {
            const id = setInterval( async () => {
                if ( await doesFileExist(path) ){
                    setSrc(audio, path, play, flag);
                    clearInterval(id);
                }
            }, 10000);
        }
    } catch ( err ) {
        let container = document.getElementById("music-player");
        if ( !container ){
            container = document.createElement("div");
        } else {
            container.innerHTML = "";
        }
        container.innerHTML = "Error";
    }
}

export default createMusicPlayer;