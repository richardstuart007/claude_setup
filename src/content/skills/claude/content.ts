import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: 'None of these have a fixed trigger; each runs automatically, matching the situation.',
  },
  {
    type: 'table',
    headers: ['Claude Skill', 'Description'],
    rows: [
      [
        'safe-install',
        "Explains what's being installed and why before running any install or download, rather than being invoked by name.",
      ],
      [
        'new-project',
        "Scaffolds a brand-new project, following this workspace's conventions. Next.js-specific mechanics, but the underlying idea (one skill that scaffolds new projects consistently) transfers to any stack.",
      ],
      [
        'db-naming',
        "Enforces this setup's table/column naming convention when a table or column is added, and handles Postgres's lack of in-place column reordering (backup, drop, recreate, copy back). Postgres-specific mechanics; the naming-discipline idea itself transfers even where the mechanics don't.",
      ],
      [
        'onboarding',
        "Integrates the shared package into a project, and pins every consuming project to the same version of it. Tied entirely to this author's own shared-package, multi-project workspace; unlikely to be useful as-is outside it.",
      ],
    ],
  },
]
