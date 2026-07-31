import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: "This is a description of a working Claude Code setup. It covers the actual permissions, commands, skills, and naming conventions in use on one real, multi-project Next.js/Postgres workspace. It is not a rulebook to adopt as-is. It is a template: a Claude Code session working in any other project can read it, decide what's genuinely useful, and rework it into its own version. The reader is in control, not this document.",
  },
  {
    type: 'paragraph',
    text: "Nothing here is filtered by audience or tech stack. Everything implemented is included. A piece may only make sense under a condition the reader might not share, such as a specific tech stack (Postgres, Next.js, Node) or a specific scenario (a multi-project workspace). Such a piece is still flagged, not omitted, with a brief pointer to an equivalent where one exists. What to do with a flagged item is the reader's own call.",
  },
  {
    type: 'paragraph',
    text: "Each section below documents two things together: what's actually implemented (the facts), and how portable it is (the annotation). The second never filters the first. A stack-specific detail still gets fully described, just marked as such.",
  },
  { type: 'heading', text: 'What the other tabs cover' },
  {
    type: 'table',
    headers: ['Tab', 'Description'],
    rows: [
      [
        'Workflow',
        'When Claude executes changes vs. stays in discussion, and the rules that prevent silent, unrequested changes',
      ],
      [
        'Permissions',
        "What's freely allowed vs. what requires explicit confirmation, and why the balance is deliberately skewed toward the plan-gate doing the real work",
      ],
      [
        'Skills',
        "The mechanism for packaging a repeatable procedure, the full catalog of skills in this setup (including the executable commands and how they're kept documented), split into what the designer runs directly vs. what Claude recognizes from a situation",
      ],
      [
        'Conventions',
        "Naming (how a value's name stays tied to one canonical meaning everywhere it appears, from a database column to a UI prop), Constants (every tunable value lives in one named file, and why that matters for spotting undisclosed decisions), and Shared (the nextjs-shared package: what it is, its components, tables, and logging)",
      ],
    ],
  },
  { type: 'heading', text: 'Where this UI itself came from' },
  {
    type: 'paragraph',
    text: "A live-rendered documentation page. This is a file describing a project's data flow or constants, rendered as an actual page in the running app rather than only readable as a raw file. This Stage 2 UI (the tabs this content is presented through) is a direct descendant of that same idea, generalized from one dataflow doc to this whole setup's documentation.",
  },
]
