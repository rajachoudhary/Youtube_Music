const express = require("express")
const youtubeMusicApi = require("youtube-music-api");
const fs = require('fs');
const path = require('path')
const ytdl = require('ytdl-core');
const axios = require('axios');

const api = new youtubeMusicApi()
const app = express();
const port = 3002;
const API_KEYS = [
    process.env.GOOGLE_API_KEY1,
    process.env.GOOGLE_API_KEY2,
    process.env.GOOGLE_API_KEY3,
    process.env.GOOGLE_API_KEY4,
]

let curr = 0;




const fetchSearchQuery = (q) => {
    q += " song"
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${q}&key=${API_KEYS[curr]}`;
    return axios(url)
}


const main = () => {
    api.initalize().then( info => {

        // for searching keywords in searchbar
        app.get("/suggestions/:keyword", (req, res) => {
            api.getSearchSuggestions(req.params.keyword).then(result => {
                res.send(result)
            })    
        });
    
        // to search different type of song/video/single/playlist/artist ( type )
        app.get("/search/:type/:keyword", (req, res) => {
            api.search(req.params.keyword, req.params.type).then(result => res.send(result)) // just search for songs    
        });

        app.get("/download/:name", async ( req, res ) => {
            try {
                const result = await fetchSearchQuery(req.params.name);
                const content = result.data.items;
                let idData;
                for ( const result of content ){
                    const { id } = result;
                    if ( id.kind === "youtube#video" ){
                        idData = id.videoId;
                        break;
                    }
                }
                
                const path = `./${req.params.name}.mp3`;
                const dir = './audio';
                
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
                
                ytdl(`http://www.youtube.com/watch?v=${idData}`, { filter: format => format.itag === 140 })
                .pipe(fs.createWriteStream(`${dir}/${req.params.name}.mp3`))
                res.send(path);
            } catch ( err ) {
                res.status = 500;
                res.send(err);
                console.log(err);    
            }
        });

        // getPlaylist / getAlbum / getArtist ( type ) and query is browseId
        app.get("/:type/:query", ( req, res ) => {
            switch ( req.params.type ){
                case "album":
                    api.getAlbum(req.params.query).then(result => res.send(result));
                    break;
                case "artist":
                    api.getArtist(req.params.query).then(result => res.send(result));
                    break;
                case "playlist":
                    api.getPlaylist(req.params.query).then(result => res.send(result));
                    break;
                default:
                    res.send(
                        {
                            "message":"Invalid request"
                        }
                    );
            }
        });
    
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`)
        })
    })
    .catch( err => {
        console.log(err);
        main();
    })
}

main();
