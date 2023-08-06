chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: 'collectTabUrls',
    title: 'Collect Tab URLs',
    contexts: ['browser_action']
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === 'collectTabUrls') {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: collectTabURLs
    });
  }
});

function collectTabURLs() {
  chrome.tabs.query({}, function(tabs) {
    let tabUrls = tabs.map(tab => tab.url);
    let tabUrlsString = tabUrls.join('\n');
    navigator.clipboard.writeText(tabUrlsString).then(function() {
      console.log('URLs copied to clipboard:', tabUrlsString);
    });
  });
}
