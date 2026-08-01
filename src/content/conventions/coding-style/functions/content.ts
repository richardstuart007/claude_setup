import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: "Named functions are always written as function declarations, never as const arrow functions, specifically because declarations hoist — this allows a file to be structured top-down, main logic first and helper functions below, without needing to declare helpers earlier just to satisfy definition order. An inline callback passed directly as a prop or argument is the one exception, since naming and hoisting don't matter for those.",
  },
]
