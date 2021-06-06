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
      let srcArray = message.savedVideos;
      var counter = 1;
      for (let src of srcArray) {
      	chrome.downloads.download({url:src, 
          filename:"GoogleVideos/"+counter+".mp4"});
      	counter++;
      };
   });