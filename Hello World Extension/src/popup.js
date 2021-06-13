window.onload = function() {
	let collectButton = document.getElementById('collect');
	collectButton.onclick = function() {
		let format = document.getElementById('format');
		let downloadButton = document.getElementById('download');
        let fname = document.getElementById('fname');

		chrome.tabs.executeScript({code : scriptCodeCollect});
		let textCollect = document.getElementById('textCollect');
		chrome.storage.local.get('savedVideos', function(result) {
            let text="";
            for(let i=0;i<result.savedVideos.length;i++){
                text += i+1 +"."+result.savedVideos[i]+"<br>";
            }
            textCollect.innerHTML = text;
		});
		
	    downloadButton.onclick = function() {
			chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
				let url = tabs[0].url;
				if(url.includes("youtube.com")) {
					let message  = {
						'url' : url,
						'format': format.value,
						"fname": fname.value
					};
					chrome.runtime.sendMessage(message);
				}
				else {
					chrome.storage.local.get('savedVideos', function(result) {
						let message = {
							'savedVideos' : result.savedVideos,
							'format': format.value
						};
						chrome.runtime.sendMessage(message, function(){
							console.log("sending success");
						});
					});
				}
			});
	    };	
	};	
};
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

