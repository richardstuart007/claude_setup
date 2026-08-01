import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'table',
    headers: ['Step', 'Description'],
    rows: [
      ['/code', '/code is a trigger which executes the Claude skill called code.'],
      [
        'Plan file requirement',
        "Executes the current plan file. If no plan file exists yet for the change in question, creates one first. A code change is never made with nothing behind it recording what changed and why.",
      ],
      [
        'Execution',
        "Works through each step in the plan in order: checking it off and appending to the log as it goes, with no confirmation needed mid-run. That pause already happened when the plan was agreed.",
      ],
      [
        'Completion',
        "Once every step is checked off, automatically writes a testing checklist and presents it in chat. This is a list of concrete, unchecked verification steps. Partially verifies some of it itself where possible (e.g. a type-check or build pass); anything requiring a running app or visual review is left for the user.",
      ],
    ],
  },
]
