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
        // prepping the artillery
        const target = {tabId};
        await chrome.debugger.attach(target, "1.3");
        await chrome.debugger.sendCommand(target, "Page.enable");
        await chrome.debugger.sendCommand(target, "Page.captureScreenshot");

        // captures the screenshot
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

        // downloads the screenshot
        const imageUrl = `data:image/png;base64,${result.data}`;
        await chrome.downloads.download({
            url: imageUrl,
            filename: "dom-capture.png",
            saveAs: true
        });
}