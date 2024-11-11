// Background Script for Monitoring Navigation
chrome.webNavigation.onCommitted.addListener(function (tab) {
    // Prevents script from running when other frames load
    if (tab.frameId == 0) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {

            // Get the URL of the webpage
            let url = tabs[0].url;
            // Remove unnecessary protocol definitions and www subdomain from the URL
            let parsedUrl = url.replace("https://", "")
                .replace("http://", "")
                .replace("www.", "");

            // Remove path and queries to isolate the base domain
            let domain = parsedUrl.slice(0, parsedUrl.indexOf('/') == -1 ? parsedUrl.length : parsedUrl.indexOf('/'))
                .slice(0, parsedUrl.indexOf('?') == -1 ? parsedUrl.length : parsedUrl.indexOf('?'));

            try {
                if (domain.length < 1 || domain === null || domain === undefined) {
                    return;
                } else if (domain == "youtube.com") {
                    runYoutubeScript();  // Corrected to run YouTube script
                    return;
                }
            } catch (err) {
                console.error(err);  // Log error instead of throwing
            }

        });
    }
});

// Function to Run YouTube Script
function runYoutubeScript() {
    // Execute the content script (youtube.js) in the active tab
    chrome.tabs.executeScript({
        file: 'youtube.js'  // Ensure this file contains the removeYouTubeAds function
    });
    return true;
}
