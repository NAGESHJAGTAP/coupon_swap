let lastCouponUrl = null; // to remember where to redirect on button click

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const domain = message.url;

  fetch(`https://coupon-swap-backend.onrender.com/api/coupon?domain=${domain}`)
    .then(response => response.json())
    .then(data => {
      const couponMessage = data.coupon;
      lastCouponUrl = data.url; // store the redirect URL

      if (couponMessage && lastCouponUrl) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon48.png",
          title: "Coupon Found!",
          message: couponMessage,
          buttons: [{ title: "Visit Coupon" }],
          priority: 2
        });
      }

      sendResponse({ coupon: couponMessage || "No coupons found for this site." });
    })
    .catch(error => {
      console.error("Error fetching coupon:", error);
      sendResponse({ coupon: "Error fetching coupon." });
    });

  return true; // keep channel open
});

chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (buttonIndex === 0 && lastCouponUrl) {
    chrome.tabs.create({ url: lastCouponUrl }); // open coupon URL
  }
});

