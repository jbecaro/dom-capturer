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
        attachDebugger(sender.tab.id)
    }
});

async function attachDebugger(tabId) {
        const target = {tabId};
        await chrome.debugger.attach(target, "1.3");
        console.log("Debugger attached!");
}