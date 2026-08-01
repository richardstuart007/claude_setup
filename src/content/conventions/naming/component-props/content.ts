import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: 'Any sub-element of a component with a hardcoded style class exposes that class as a named override prop, using a fixed suffix per role, so a caller can restyle just that one part without forking the component. This is the same one-canonical-name principle applied to component authoring rather than data values.',
  },
  {
    type: 'table',
    headers: ['Role', 'Prop'],
    rows: [
      ['The main element itself', 'className (plain passthrough)'],
      ['Label', 'labelClass'],
      ['Heading/title', 'titleClass'],
      ['Wrapper/container div', 'containerClass'],
    ],
  },
]
