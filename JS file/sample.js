fetch("https://theaudiodb.p.rapidapi.com/searchalbum.php?s=daft_punk", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "theaudiodb.p.rapidapi.com",
		"x-rapidapi-key": "c89f64154cmsh81516776442fbabp10817ajsn5c45f770e387"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});