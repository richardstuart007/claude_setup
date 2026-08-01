import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: "A skill is a folder of instructions for a specific kind of task, invoked either by an explicit trigger word or by matching a described situation. The trigger (where one exists) is what the designer actually uses. The fact that a skill runs behind it is an internal detail. Every skill in this setup is listed below, with a sub-tab per skill for the full detail. This list itself is documented in one file, kept in sync with the real behavior whenever a trigger's definition changes.",
  },
  {
    type: 'table',
    headers: ['Designer Skill', 'Trigger', 'Notes'],
    rows: [
      ['Plan', '/plan', 'Creates a plan file from the current discussion'],
      ['Code', '/code', 'Executes the current plan file'],
      ['Commit', '/commit', 'The full git pipeline for a finished plan'],
      ['Cross-project audit', '/audit', 'Specific to a shared-package, multi-project workspace'],
      ['Clean dependency reinstall', '/reinstall', 'Node/npm-specific'],
      [
        'Permission exception',
        '/noprompt',
        "Adds an exact-command exception to the permission-exceptions mechanism so that one specific command stops triggering a permission prompt, while everything else in its family still asks. If no command is given inline, asks which exact command to exempt. Runs immediately, no confirmation, including for destructive-category commands (force-push, hard reset, branch deletion, cleaning untracked files, destructive SQL, killing processes), though those are flagged explicitly in the report. Generic mechanism, works anywhere.",
      ],
      ['Combined skill/command catalog', '/skillslist', 'Generic mechanism, works anywhere'],
    ],
  },
  {
    type: 'table',
    headers: ['Claude Skill', 'Trigger', 'Notes'],
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
    type: 'table',
    headers: ['Claude Instructions', 'Description'],
    rows: [
      [
        'Check for a matching skill before acting on any trigger',
        "Before acting on any #word message, the list of skills is checked first, rather than acting from memory of what a trigger \"usually\" does. A short prose mention of a trigger elsewhere doesn't capture everything a full skill does; substituting a plausible-looking command instead of the real skill can silently skip steps the skill would otherwise perform. Generic pattern: any interactive assistant with both a skill-lookup mechanism and stated conventions elsewhere risks this same drift between the two.",
      ],
      [
        'Keeping the catalog in sync',
        "Whenever any trigger's definition changes, the catalog file is updated to match before the task is considered finished. The catalog is only as trustworthy as this discipline; letting it drift out of sync defeats the reason it exists.",
      ],
      [
        'Commands given to the user are never backtick-quoted',
        "When a response contains a command the user is meant to run themselves, it's placed on its own line with no backtick quoting around it, so it can be copy-pasted directly without editing out surrounding punctuation.",
      ],
    ],
  },
]
