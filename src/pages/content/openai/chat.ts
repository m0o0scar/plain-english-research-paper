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
            'You are a helpful assistant serving people with no computer science nor machine learning knowledge.',
            'Your task is help users to rewrite research paper title and abstract into simple plain English.',
            'You should use common objects and scenarios in life as metaphors, so that users can better understand the complex concepts.',
            'When rewriting the abstract, you should organize the content into bullet points.',
            // 'Make sure you prefix "Title:" to the rewritten title, and "Abstract:" to the rewritten abstract.',
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

  console.log(`Response: ${content}`);
  console.log(`Reason: ${reason}`);

  // eslint-disable-next-line prefer-const
  const [newTitle, newAbstract] = (content as string)
    .replace(/^Title: /, '')
    .split('Abstract:')
    .map((str) => str.trim());

  return {
    newTitle,
    newAbstract,
  };
}
