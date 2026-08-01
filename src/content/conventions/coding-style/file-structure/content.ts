import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'table',
    headers: ['Rule', 'Description'],
    rows: [
      [
        'Directive placement',
        "A framework directive controlling whether a file runs on the server or the client is always the very first line, before any imports",
      ],
      ['Constants above the component', 'Top-level constants are declared once above the component or function that uses them, never written inline at the point of use'],
      ['State grouped by concern', "In a component, all pieces of local state are declared together at the top, grouped by what they relate to, rather than interleaved with other logic"],
      ['Named exports only in action files', 'A file whose exports are called as server actions exposes named exports only, no default export'],
    ],
  },
]
