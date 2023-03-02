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
    const title = titleEl.innerText.trim().replace(/\n/g, '');
    const abstract = abstractEl.innerText.trim().replace(/\n/g, '');
    const { newTitle, newAbstract } = await chatCompletion(title, abstract);

    insertBefore(titleEl, newTitle, 'plain-english');
    insertBefore(abstractEl, newAbstract, 'plain-english');
  }
}

main();
