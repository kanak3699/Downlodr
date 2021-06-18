let downloadsArray= [];
let initialState = {
	'savedVideos': downloadsArray
};

// Install a listener of Chrome API
//Source: https://blog.learningdollars.com/2019/12/24/how-to-develop-an-extension-to-download-images-from-google/,
//https://blog.learningdollars.com/2020/04/01/how-to-make-a-chrome-extension-to-download-youtube-videos/,
//https://developer.chrome.com/docs/extensions/reference/runtime/
chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		//set conditions in the current page
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
				})
			],
			actions: [ new chrome.declarativeContent.ShowPageAction() ]
		}]);
	});
	//provide the strorage capabilities
	chrome.storage.local.set(initialState);
});

// Add a listener
chrome.runtime.onMessage.addListener(
    function(message, callback) {
	  // Downloader for other websites
	  if(message.hasOwnProperty("savedVideos")) {
		let vidArray = message.savedVideos;
		for (let vid of vidArray) {
		//chrome download API, creating a repo name and file name for the videos
		  chrome.downloads.download({url:vid, 
			filename:"DownlodrExtension/" + message.fname + '.' + message.format});
		};
	  }
	  // Downloader for Youtube
	  else {
		let url = 'http://localhost:3000/youtube?';
		let query = Object.keys(message).map(key => key + '=' + message[key]).join('&');
		url += query;
		chrome.downloads.download({url:url,
			filename: "DownlodrExtension/" + message.fname + '.' + message.format});
	  }
   });