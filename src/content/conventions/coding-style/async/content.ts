import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: 'Asynchronous code always uses await, never a raw .then()/.catch() chain. Inside a lifecycle effect hook, asynchronous work is wrapped in a small named inner function that is then immediately invoked, rather than making the effect callback itself async.',
  },
  {
    type: 'code',
    text: `useEffect(() => {
  async function load() {
    const data = await fetchSomething()
    setState(data)
  }
  load()
}, [dep])`,
  },
]
