import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'table',
    headers: ['Rule', 'Description'],
    rows: [
      [
        'One named file',
        'Any hardcoded literal that represents a real decision (a batch size, a retry count, a default category, a threshold) lives in one named constants file per project, never scattered inline in the code that uses it or duplicated across two files',
      ],
      [
        'Catches undisclosed decisions',
        'Constants as explicit imports make it easier for the designer to see when Claude has made a decision and not said so, because the constants file itself changes. One more method to catch Claude making decisions without informing the designer',
      ],
      [
        'No function decides internally',
        'This is as much a structure-the-codebase rule as a naming rule',
      ],
      [
        'Agreed before use',
        "Any numeric limit, threshold, cap, or similar constant is written into the plan with its actual value and explicitly agreed, before it's used in any code. Applies whether it's new, or a change to what an existing one applies to. See the plan tab for the full plan-gate policy this belongs to",
      ],
    ],
  },
]
