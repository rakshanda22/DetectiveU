console.log("Content Script activated")

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message,sender,sendResponse) {
  console.log(message.url)
  chrome.tabs.update(null,{url:"https://www.google.com"})
}
