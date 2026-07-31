export type TextPart = string | { bold: string }

export type ContentBlock =
  | { type: 'paragraph'; text: string | TextPart[] }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; text: string }
  | { type: 'table'; headers: string[]; rows: (string | TextPart[])[][] }
