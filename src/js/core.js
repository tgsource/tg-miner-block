const filters = {
    urls: ['<all_urls>'],
    types: [
        'script',
        'websocket',
        'xmlhttprequest'
    ]
};

const extraInfoSpec = ['blocking'];

const isWasmScriptDetected = (url) => url.match('wasm');

const isMinerDetected = (url) => {
    if (isWasmScriptDetected(url)) {
        return true;
    }

    return false;
};

const setIcon = (type, tabId) => {
    chrome.browserAction.setIcon({
        tabId,
        path: {
            16: `resources/icons/16-${type}.png`,
            32: `resources/icons/32-${type}.png`,
            48: `resources/icons/48-${type}.png`,
            128: `resources/icons/128-${type}.png`,
        }
    });
};

const watchRequest = (details) => {
    if (isMinerDetected(details.url)) {
        setIcon('enabled-blocked', details.tabId);
        return { cancel: true };
    }

    return { cancel: false };
};

chrome.webRequest.onBeforeRequest.addListener(watchRequest, filters, extraInfoSpec);
