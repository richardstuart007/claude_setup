import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: "A skill is a folder of instructions for a specific kind of task, invoked either by an explicit trigger word or by matching a described situation. The trigger (where one exists) is what the designer actually uses. The fact that a skill runs behind it is an internal detail. Every skill in this setup is listed below, with a sub-tab per skill for the full detail. This list itself is documented in one file, kept in sync with the real behavior whenever a trigger's definition changes.",
  },
  { type: 'heading', text: 'Executable commands (the designer types these)' },
  {
    type: 'table',
    headers: ['Skill', 'Trigger', 'Notes'],
    rows: [
      ['Plan', '/plan', 'Creates a plan file from the current discussion'],
      ['Code', '/code', 'Executes the current plan file'],
      ['Commit', '/commit', 'The full git pipeline for a finished plan'],
      ['Cross-project audit', '/audit', 'Specific to a shared-package, multi-project workspace'],
      ['Clean dependency reinstall', '/reinstall', 'Node/npm-specific'],
      ['Permission exception', '/noprompt', 'Generic mechanism, works anywhere'],
      ['Combined skill/command catalog', '/skillslist', 'Generic mechanism, works anywhere'],
    ],
  },
  { type: 'heading', text: 'For Claude (no fixed trigger; recognized from the situation)' },
  {
    type: 'table',
    headers: ['Skill', 'Trigger', 'Notes'],
    rows: [
      [
        'Explain-before-installing',
        '(none: used automatically before any install/download)',
        "Generic pattern: explains what's being installed and why before running it",
      ],
      [
        'New-project scaffolding',
        '(none: invoked by asking to start a new project)',
        'Next.js-specific mechanics, but the underlying idea (one skill that scaffolds new projects consistently) transfers to any stack',
      ],
      [
        'Database naming / column reordering',
        '(none: invoked by asking to add or reorder a table/column)',
        "Postgres-specific, enforces this setup's table/column naming convention",
      ],
      [
        'nextjs-shared onboarding / version-pinning',
        '(none: invoked by asking to onboard or pin a version)',
        "Tied entirely to this author's own shared-package workspace; unlikely to be useful as-is elsewhere",
      ],
    ],
  },
  {
    type: 'paragraph',
    text: 'A fourth workflow trigger, #tested, originally existed as a skill too. It was identified as an error and removed entirely.',
  },
]
