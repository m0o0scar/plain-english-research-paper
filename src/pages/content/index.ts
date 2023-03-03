import { chatCompletion } from './openai/chat';

function insertBefore(el: HTMLElement, content: string, classes = '') {
  const newEl = document.createElement(el.tagName);
  newEl.className = el.className + ' ' + classes;
  newEl.innerText = content;
  el.parentElement.insertBefore(newEl, el);
}

async function main() {
  // find the title and abstract element
  let titleEl: HTMLElement, abstractEl: HTMLElement;

  if (location.href.startsWith('https://paperswithcode.com/paper/')) {
    titleEl = document.querySelector('.paper-title h1');
    abstractEl = document.querySelector('.paper-abstract p');
  }

  if (titleEl && abstractEl) {
    let rewrittenVersion: { newTitle: string; newAbstract: string };

    // is there any stored result in storage?
    const key = `cache-${location.href}`;
    const cachedValue = await chrome.storage.local.get([key]);
    if (cachedValue[key]) {
      rewrittenVersion = cachedValue[key];
    } else {
      // if not, get the original title & abstract, then ask ChatGPT to simplify them
      const title = titleEl.innerText.trim().replace(/\n/g, '');
      const abstract = abstractEl.innerText.trim().replace(/\n/g, '');
      rewrittenVersion = await chatCompletion(title, abstract);

      // save result
      await chrome.storage.local.set({ [key]: rewrittenVersion });
    }

    // show simplified version on the page
    insertBefore(titleEl, rewrittenVersion.newTitle, 'plain-english');
    insertBefore(abstractEl, rewrittenVersion.newAbstract, 'plain-english');
  }
}

main();
