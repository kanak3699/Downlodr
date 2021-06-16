let downloadsArray= [];

let initialState = {
	'savedVideos': downloadsArray
};

// Install a listener of Chrome API
chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
				})
			],
			actions: [ new chrome.declarativeContent.ShowPageAction() ]
		}]);
	});
	chrome.storage.local.set(initialState);
});

// Add a listener
chrome.runtime.onMessage.addListener(
    function(message, callback) {
	  // Downloader for other websites
	  if(message.hasOwnProperty("savedVideos")) {
		let srcArray = message.savedVideos;
		for (let src of srcArray) {
		  chrome.downloads.download({url:src, 
			filename:"DownlodrExtension/" + message.fname + '.' + message.format});
		};
	  }
	  // Downloader for Youtube
	  else {
		let url = 'http://localhost:4000/download?';
		let queryString = Object.keys(message).map(key => key + '=' + message[key]).join('&');
		url += queryString;
		chrome.downloads.download({url:url,
			filename: "DownlodrExtension/" + message.fname +'.' + message.format});
	  }
   });