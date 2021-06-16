window.onload = function() {
	let collectButton = document.getElementById('collect');
	const YOUTUBE = "youtube.com";
    
	// Event after Collect Button
	collectButton.onclick = function() {
		let format = document.getElementById('format').value;
		let downloadButton = document.getElementById('download');
        let fname = document.getElementById('fname').value;
		let textCollect = document.getElementById('textCollect');
        
		// Collect videos on a web page
		chrome.tabs.executeScript({code : scriptCodeCollect});
        
		// Display existing video links
		chrome.storage.local.get('savedVideos', function(result) {
            let text="";
            for(let i=0;i<result.savedVideos.length;i++){
                text += i+1 +"."+result.savedVideos[i]+"<br>";
            }
            textCollect.innerHTML = text;
		});
		
		// Download 
	    downloadButton.onclick = function() {
			chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
				let url = tabs[0].url;
                if(fname == null || fname == "") {
					fname = "downloadedVideo";
				}
				let message  = {
					'format': format,
					"fname": fname
				};
				// Downloader for Youtube
				if(url.includes(YOUTUBE)) {
					message.url = url;
					chrome.runtime.sendMessage(message);
				}
				// Downloader for other websites
				else {
					chrome.storage.local.get('savedVideos', function(result) {
						message.savedVideos = result.savedVideos;
						chrome.runtime.sendMessage(message);
					});
				}
			});
	    };	
	};	
};

// Collect Videos Script
const scriptCodeCollect =
  `(function() {
  		let videos = document.querySelectorAll('video');
		let srcArray = Array.from(videos).map(function(video) {
			return video.currentSrc;
		});
        chrome.storage.local.get('savedVideos', function(result) {
        		videostodownload = [];
        		for (vid of srcArray) {
        			if (vid) videostodownload.push(vid);
        		};
				result.savedVideos = videostodownload;
				chrome.storage.local.set(result);
				console.log("local collection setting success:"+result.savedVideos.length); 
			});
    })();`;

