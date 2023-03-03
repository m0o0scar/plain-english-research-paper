import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';

reloadOnUpdate('pages/background');

console.log('background loaded');

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'src/pages/options/index.html' });
});
