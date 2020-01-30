import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';
import { trim } from './trim';
import { gyazo } from './gyazo';
import CaptureVisibleTabFull from 'chrome-tab-capture-visible-tab-full';

const currentTab = () => {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0]);
    });
  });
};

chrome.browserAction.onClicked.addListener(async ()=>{
  const tab = await currentTab();
  chrome.tabs.sendMessage(tab.id, { type: 'Capture' });
});

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.type === 'ContentRect') {
    const { rect, url, title } = msg;
    const captureVisibleTabFull = new CaptureVisibleTabFull();
    const tab = await currentTab();
    console.log(tab);
    const canvas = await captureVisibleTabFull.capture({ tab });
    const image_url = await trim(canvas.toDataURL(), rect);
    const gyazoUrl = await gyazo({ image_url, title, url });
    chrome.tabs.sendMessage(tab.id, { type: 'Jump', url: gyazoUrl });
  }
});

