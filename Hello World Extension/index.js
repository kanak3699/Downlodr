
// This is our server, it is used to download videos from Youtube.

var express = require('express');
var app = express();
var ytdl = require('ytdl-core');

// Server listens on http://localhost:4000/
app.listen('4000', function(){
	console.log("listening on 4000");
});

// GET METHOD that downloads videos
app.get('/download', function(req, res) {
	var link = req.query.url;
	var format = req.query.format;
    
	// download video with Youtube-DL
	video = ytdl(link,{
		format:format,
	});

	video.pipe(res);
});