import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'table',
    headers: ['Topic', 'Description'],
    rows: [
      ['/plan', '/plan is a trigger which executes the Claude skill called plan.'],
      [
        'Create plan',
        "Creates a plan file in the docs folder. If an unfinished plan file already exists for the project, a new one isn't created alongside it. The existing one is amended or continued instead. The file contains: Location: docs/PLAN_<slug>.md; a title; a checklist of what will change; an empty log section.",
      ],
    ],
  },
  {
    type: 'table',
    headers: ['Claude Rules', 'Description'],
    rows: [
      [
        'Amendable while in progress',
        "Can be freely amended for as long as the task is still in progress. New steps can be added, existing ones adjusted, right up until execution finishes. This is the plan-gate itself: no code change happens without one of these existing first, agreed, however small the change.",
      ],
      [
        'Explicit choices: never decide silently',
        'A genuine judgment call is one a competent engineer could reasonably decide differently, not a typo-level fix. When one comes up during implementation, it gets surfaced to the user as an explicit choice, rather than silently picked and left for the user to discover later by reading the code.',
      ],
      [
        "Constraint values must be agreed before they're used",
        "Any numeric limit, threshold, cap, or similar constant is written into the plan with its actual value and explicitly agreed, before it's used in any code. See the Constants sub-tab (under Conventions) for the full convention this feeds into.",
      ],
      [
        'A running Changes log',
        'As each plan step is completed, what actually changed is appended to the plan, grouped by file. This is a written record of what was done, readable without opening any code file.',
      ],
    ],
  },
]
