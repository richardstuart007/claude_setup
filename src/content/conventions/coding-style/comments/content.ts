import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: "Every inline comment inside a function body is at least 3 lines: an empty comment line above the text and another below it, even for a single line of explanation. Every named function is preceded by a comment header naming the function and summarizing what it does, in a fixed dashed-line style that differs slightly between an indented component-internal function and a top-level file function.",
  },
  {
    type: 'code',
    text: `//
//  Actual comment text here
//
const foo = ...`,
  },
  {
    type: 'paragraph',
    text: "This exact formatting (line count, dash count, indentation) is a stylistic house convention, not something with a portable rationale behind it. What is transferable is the underlying idea: a comment is easy to spot visually, and every function is identifiable by a one-line summary without reading its body.",
  },
]
