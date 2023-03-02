export async function chatCompletion(title: string, abstract: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer -`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: [
            'Your user is a common people with no computer science nor machine learning knowledge.',
            'You are a helpful assistant that help your user to rewrite research paper title and abstract into simple plain English',
            'so that your user can understand the paper easier.',
          ].join(' '),
        },
        {
          role: 'user',
          content: [`Title: ${title}`, `Abstract: ${abstract}`].join('\n'),
        },
      ],
    }),
  });

  const {
    choices: [
      { message: { content = '' } = {}, finish_reason: reason = '' },
    ] = [],
  } = await response.json();

  // eslint-disable-next-line prefer-const
  let [newTitle, newAbstract] = content
    .split('Abstract: ')
    .map((str) => str.trim().replace(/\n/g, ''));
  newTitle = newTitle.replace(/^Title: /, '');

  return {
    newTitle,
    newAbstract,
  };
}
