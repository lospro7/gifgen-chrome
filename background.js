
var httpUrl = "http://imgur.com/";
var httpsUrl + "https://imgur.com/";

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
    console.log('Going to gifgen...');
  
    chrome.tabs.getAllInWindow(undefined, function(tabs) {
        for (var i = 0, tab; tab = tabs[i]; i++) {
            if (tab.url && isGifGenUrl(tab.url)) {
                console.log('Found GifGen tab: ' + tab.url + '. Focusing and refreshing count...');
                chrome.tabs.update(tab.id, {selected: true});
                startRequest({scheduleRequest:false, showLoadingAnimation:false});
                return;
            }
        }

        console.log('Could not find GifGen tab. Creating one...');
        chrome.tabs.create({url: httpsUrl});
    });
});

var lastUrl = "";

setInterval(function(){
    getCurrentTabUrl(function(url) {
        if(lastUrl != url) {
            // if url response cached, return that
            // do an ajax request
            // if response is good, then change icon color to green
            // else, change icon color to gray
            // cache the response
        }

        lastUrl = url;
    });
}, 500);
