console.log("background Script Activated")

chrome.tabs.query({active: true,lastFocusedWindow: true}, function(tabs) {
    // and use that tab to fill in out title and url
    var tab = tabs[0];
    var oldURL = tab.url ;
    //console.log(tab.url);
    //alert(tab.url);
    //console.log(tabs)
    var idnum = tab.id
/*Need to modify the url here before sending it to content.js*/
    console.log(oldURL)
    chrome.browserAction.onClicked.addListener(buttonClicked);

    function buttonClicked(tab){
      let msg = {
        url : oldURL
      }

      chrome.tabs.sendMessage(tab.id,msg)
    }
});
