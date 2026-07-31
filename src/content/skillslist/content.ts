import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: [{ bold: '/skillslist' }, ' is a trigger which executes the Claude skill called ', { bold: 'skillslist' }, '.'],
  },
  {
    type: 'paragraph',
    text: "Prints a combined, described list of every custom skill plus every trigger command, since the built-in skill picker doesn't show descriptions in this setup. Read-only, nothing is written.",
  },
]
