import ExtractContentJS from './extract-content-allinone';

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'Capture') {
    const ex = new ExtractContentJS.LayeredExtractor();
    ex.addHandler(ex.factory.getHandler('Heuristics'));

    const res = ex.extract(document);

    const title = document.title;
    const url = location.href;

    if (res.isSuccess) {
      const rect = res.content.asNode().getBoundingClientRect();
      chrome.runtime.sendMessage({ type: 'ContentRect', rect, title, url });
    } else {
      const rect = document.body.getBoundingClientRect();
      chrome.runtime.sendMessage({ type: 'ContentRect', rect, title, url });
    }
  }

  if (msg.type === 'Jump') {
    window.open(msg.url);
  }
});
