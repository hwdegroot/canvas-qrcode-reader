chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["scripts/jsQR.min.js"],
    })
    .then(() => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["scripts/parseQR.js"],
        });
    })
});
