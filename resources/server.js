const express = require("express")
const youtubeMusicApi = require("youtube-music-api");

const api = new youtubeMusicApi()
const app = express();
const port = 3002;

api.initalize().then( info => {

    // for searching keywords in searchbar
    app.get("/suggestions/:keyword", (req, res) => {
        console.log(req.params)
        api.getSearchSuggestions(req.params.keyword).then(result => {
            res.send(result)
        })    
    });

    // to search different type of song/video/single/playlist/artist ( type )
    app.get("/search/:type/:keyword", (req, res) => {
        api.search(req.params.keyword, req.params.type).then(result => res.send(result)) // just search for songs    
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
        console.log(`Example app listening at http://localhost:${port}`)
    })
});