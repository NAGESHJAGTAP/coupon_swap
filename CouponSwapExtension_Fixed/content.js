// content.js
const currentUrl = window.location.hostname;
console.log("Current domain is:", currentUrl);
chrome.runtime.sendMessage({ url: currentUrl });
