chrome.action.onClicked.addListener((tab) => {
    console.log("tab",tab)
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });
});

