// popup.js
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const domain = new URL(tabs[0].url).hostname;
  chrome.runtime.sendMessage({ url: domain }, (response) => {
    document.getElementById("message").textContent = response.coupon;
  });
});
