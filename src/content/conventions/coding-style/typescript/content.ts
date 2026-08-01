import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'table',
    headers: ['Rule', 'Description'],
    rows: [
      ['Explicit typing', 'Function parameters and return values are always typed explicitly, not left to inference'],
      ['Shared row types', 'A type describing a shared data shape is imported from one central location rather than redefined per file'],
      ['type over interface', 'A plain data shape is declared with type rather than interface, kept consistent throughout'],
    ],
  },
]
