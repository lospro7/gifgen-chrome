
var lastUrl = "";
var lastJqxhr;
var httpUrl = "http://imgur.com/vidgif";
var httpsUrl = "https://imgur.com/vidgif";

function isGifGenUrl(url) {
    return url.indexOf(httpUrl) == 0 || url.indexOf(httpsUrl) == 0;
}

function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0];
        var url = tab.url;
        console.assert(typeof url == 'string', 'tab.url should be a string');
        callback(url);
    });
}

chrome.browserAction.onClicked.addListener(function goToGifGen() {
    getCurrentTabUrl(function(url) {
		chrome.tabs.create({url: httpsUrl+"?url="+encodeURIComponent(url)+"&start=0&duration=5"});
	});
});

function isValid(cbActive, cbInactive, url) {
	if(lastJqxhr) {
		lastJqxhr.abort();
	}

	lastJqxhr = $.get(httpUrl+"/url?url="+encodeURIComponent(url), function(data) {
		if(data.success && data.data.src != null) {
			cbActive();
		} else {
			cbInactive();
		}
	});

	lastUrl = url;
}

setInterval(function(){
    getCurrentTabUrl(function(url) {
		if(lastUrl != url) {
			isValid(function() {
				chrome.browserAction.setIcon({path:"active.png"});
				chrome.browserAction.setTitle({title: "Convert this video into a GIF"});
			}, function() {
				chrome.browserAction.setIcon({path:"inactive.png"});
				chrome.browserAction.setTitle({title: "Imgur video to GIF"});
			}, url);
		}
    });
}, 1000);
