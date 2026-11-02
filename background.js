// runs the program on click
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["picker.js"]
    });
});

// check if the message is received
chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === "ELEMENT_SELECTED") {
        const tabId = sender.tab.id;
        console.log("Tab ID:", tabId);
        console.log("Message received:", message);
        console.log("Sender:", sender);
    }
});