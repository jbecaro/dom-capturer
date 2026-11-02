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
        captureScreenshot(sender.tab.id, message.rect)
    }
});

// creates the screenshot
async function captureScreenshot(tabId, area) {
        const target = {tabId};
        await chrome.debugger.attach(target, "1.3");
        await chrome.debugger.sendCommand(target, "Page.enable");
        await chrome.debugger.sendCommand(target, "Page.captureScreenshot");

        const result = await chrome.debugger.sendCommand(
            target,
            "Page.captureScreenshot",
            {
                format: "png",
                captureBeyondViewport: true,
                clip: {
                    ...area,
                    scale: 1
                }
            }
        );
}