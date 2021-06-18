
// This is our server, it is used to download videos from Youtube.

const express = require('express');
const app = express();
const ytdl = require('ytdl-core');
const port = '3000';


// GET METHOD that downloads videos
app.get('/youtube', function(req, res) {
	var link = req.query.url;
	var format = req.query.format;
    
	// download video with Youtube-DL
	video = ytdl(link,{
		format:format,
	});

	video.pipe(res);
});

// Server listens at http://localhost:3000/
app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`)
  })