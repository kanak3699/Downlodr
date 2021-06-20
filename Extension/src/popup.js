//Source: https://blog.learningdollars.com/2019/12/24/how-to-develop-an-extension-to-download-images-from-google/
window.onload = function() {
	let collectButton = document.getElementById('collect');
	const YOUTUBE = "youtube.com";
	const CONFIRM_MESSAGE = "Default file name is 'downloadedVideo'. Do you want to continue?";
	
	// Event after Collect Button
	collectButton.onclick = function() {
		let downloadButton = document.getElementById('download');
		let textCollect = document.getElementById('textCollect');
        
		// Collect videos on a web page
		chrome.tabs.executeScript({code : scriptCodeCollect});
        
		// Display existing video links
		chrome.storage.local.get('savedVideos', function(result) {
            let text="";
            for(let i=0;i<result.savedVideos.length;i++){
                text += i+1 + ". " + result.savedVideos[i] + "<br>";
            }
            textCollect.innerHTML = text;
		});
		
	    // Download 
	    downloadButton.onclick = function() {
			chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
				let url = tabs[0].url;
				let format = document.getElementById('format').value;
                let fname = document.getElementById('fname').value;

	            //if there is a user input for file name, then the file will be name as it is. Otherwise, it will be named "downloadedVideo"
                if(fname == null || fname == "") {
			        // Send confirm message
					if(confirm(CONFIRM_MESSAGE)) {
						fname = "downloadedVideo";
					}
		            else {
						return;
					}
	            }

		        let message  = {
		            'format': format,
		            'fname': fname
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
//Source: https://blog.learningdollars.com/2019/12/24/how-to-develop-an-extension-to-download-images-from-google/
const scriptCodeCollect =
   `(function() {
		//querySelector API to select all links in <video> tag in current page
  		let videos = document.querySelectorAll('video,audio');
		let srcArray = Array.from(videos).map(function(video) {
			return video.currentSrc;
		});
	//to get web page data for extension
        	chrome.storage.local.get('savedVideos', function(result) {
        		videostodownload = [];
        		for (vid of srcArray) {
        			if (vid) videostodownload.push(vid);
        		};
				result.savedVideos = videostodownload;
				//store the videos' link that prepare to be downloaded
				chrome.storage.local.set(result);
				console.log("local collection setting success:"+result.savedVideos.length); 
			});
    })();`;

