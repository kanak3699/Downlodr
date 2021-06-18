/**
 * File: index.js
 * Author: 
 * Purpose: Group Project (Group 4) for CSCI 3130 (Software Engineeering) Project.
 * Description: This is the server file to download videos from YouTube. It uses express server and listens to port 3000. 
 * 
*/
// This is our server, it is used to download videos from Youtube.

const express = require('express');	// Express Server
const app = express();
const ytdl = require('ytdl-core');	// ytdl-core dependency
const port = '3000';				// Listening port: 3000

/**
 * This is the get method to download YouTube videos.
 * @param req	:	Request
 * @param res	:	Response
*/

// GET METHOD that downloads videos
app.get('/youtube', function (req, res) {
	var link = req.query.url;
	var format = req.query.format;

	// download video with Youtube-DL
	video = ytdl(link, {
		format: format,
	});

	video.pipe(res);
});

// Server listens at http://localhost:3000/
app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`)
})