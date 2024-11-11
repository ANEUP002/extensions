// Content script (youtube.js)
function removeYouTubeAds() {
    // 1. Remove Overlay Ads (ads that appear in video player)
    let overlayAds = document.querySelectorAll(".ytp-ad-overlay-container, .ytp-ad-module");
    overlayAds.forEach(ad => {
        ad.style.display = "none";  // Hide overlay ads
    });

    // 2. Remove Video Ads (ads playing in place of a video)
    let videoAds = document.querySelectorAll(".video-ads, .ytp-ad-player-overlay");
    videoAds.forEach(ad => {
        ad.style.display = "none";  // Hide video ads
    });

    // 3. Remove Promoted Videos in the Video List
    let promotedVideos = document.querySelectorAll("ytd-promoted-sparkles-web-renderer, ytd-display-ad-renderer, .ytd-promoted-video-renderer");
    promotedVideos.forEach(promoted => {
        let parent = promoted.closest("ytd-video-renderer, ytd-grid-video-renderer, ytd-item-section-renderer");
        if (parent) {
            parent.style.display = "none";  // Hide the promoted video container
        } else {
            promoted.style.display = "none";  // Fallback to hiding the ad itself
        }
    });

    // 4. Remove Sidebar Ads (ads that appear around the main content)
    let sidebarAds = document.querySelectorAll("#masthead-ad, #player-ads, .ytd-banner-promo-renderer");
    sidebarAds.forEach(ad => {
        ad.style.display = "none";  // Hide sidebar ads
    });

    // 5. Remove Ads Appearing on the Homepage
    let homepageAds = document.querySelectorAll("#contents ytd-rich-item-renderer[is-promoted], #contents ytd-rich-shelf-renderer[is-promoted]");
    homepageAds.forEach(ad => {
        ad.style.display = "none";  // Hide promoted content on homepage
    });
}

// Initial run to remove ads when the page loads
removeYouTubeAds();

// Ensures ads will be removed as the user interacts and new content loads
setInterval(removeYouTubeAds, 2000);
