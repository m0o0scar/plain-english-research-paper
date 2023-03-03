import { chatCompletion } from './openai/chat';

const clsForOriginal = [
  'animate-pulse',
  '!bg-slate-200',
  '!rounded-lg',
  'px-3',
  'py-1',
];
const clsForRewritten = ['!bg-green-200', '!rounded-lg', 'px-3', 'py-1'];

function insertBefore(el: HTMLElement, content: string) {
  const newEl = document.createElement(el.tagName);
  newEl.className = el.className;
  newEl.classList.remove(...clsForOriginal);
  newEl.classList.add(...clsForRewritten);
  newEl.innerText = content;
  el.parentElement.insertBefore(newEl, el);
}

async function main() {
  // find the title and abstract element
  let titleEl: HTMLElement, abstractEl: HTMLElement;

  if (location.href.startsWith('https://paperswithcode.com/paper/')) {
    titleEl = document.querySelector('.paper-title h1');
    abstractEl = document.querySelector('.paper-abstract p');
  } else if (location.href.startsWith('https://arxiv.org/abs/')) {
    titleEl = document.querySelector('#abs h1.title');
    abstractEl = document.querySelector('#abs blockquote.abstract');
  }

  if (titleEl && abstractEl) {
    // give user some feedback
    titleEl.classList.add(...clsForOriginal);
    abstractEl.classList.add(...clsForOriginal);

    let rewrittenVersion: { newTitle: string; newAbstract: string };

    // is there any stored result in storage?
    try {
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

      if (rewrittenVersion) {
        // show simplified version on the page
        insertBefore(titleEl, rewrittenVersion.newTitle);
        insertBefore(abstractEl, rewrittenVersion.newAbstract);
      }
    } finally {
      titleEl.classList.remove(...clsForOriginal);
      abstractEl.classList.remove(...clsForOriginal);
    }
  }
}

main();
