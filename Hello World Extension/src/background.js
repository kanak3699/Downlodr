let downloadsArray= [];
let initialState = {
	'savedVideos': downloadsArray
};
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
	console.log("initialState set");
});

chrome.runtime.onMessage.addListener(
    function(message, callback) {
      console.log("message coming");
      console.log(message);
	  if(message.hasOwnProperty("savedVideos")) {
		let srcArray = message.savedVideos;
		var counter = 1;
  
		for (let src of srcArray) {
		  chrome.downloads.download({url:src, 
			filename:"DownlodrExtension/"+ "file" + counter + '.' + message.format});
		  counter++;
		};
	  }
	  else {
		var url = 'http://localhost:4000/download?';
		var queryString = Object.keys(message).map(key => key + '=' + message[key]).join('&');
		url += queryString;
		console.log(url);
		chrome.downloads.download({url:url,
			filename: "DownlodrExtension/" + message.fname +'.' + message.format}, function(downID) {
				chrome.downloads.show(downID);
		});
	  }
      
   });