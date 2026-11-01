chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["picker.js"]
    });
});

// check if the message is received
chrome.runtime.onMessage.addListener((message, sender) => {
    console.log("Message received:", message);
});