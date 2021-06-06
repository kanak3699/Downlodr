window.onload = function() {
	let collectButton = document.getElementById('collect');
	collectButton.onclick = function() {
		chrome.tabs.executeScript({code : scriptCodeCollect});
		let textCollect = document.getElementById('textCollect');
		chrome.storage.local.get('savedVideos', function(result) {
            //textCollect.innerHTML = "collected "+ result.savedImages.length + " videos" +"<br>";
            var i;
            var text="";
            for(i=0;i<result.savedVideos.length;i++){
                text += i+1 +"."+result.savedVideos[i]+"<br>";
            }
            textCollect.innerHTML = text;
		});
	};

	let downloadButton = document.getElementById('download');
	downloadButton.onclick = function() {
		downloadButton.innerHTML = "Downloaded ";
		chrome.tabs.executeScript({code : scriptCodeDownload});
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

const scriptCodeDownload =
  `(function() {
		chrome.storage.local.get('savedVideos', function(result) {
			let message = {
				"savedVideos" : result.savedVideos
			};
			chrome.runtime.sendMessage(message, function(){
				console.log("sending success");
			});
		});
    })();`;