import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: "Scenario-specific to this author's setup: a private shared package, consumed by several of the author's own Next.js projects, providing all direct database access, shared UI components, and utility functions. Consuming projects never call the database directly. They always go through this package.",
  },
  { type: 'heading', text: 'Why it exists' },
  {
    type: 'paragraph',
    text: "One place to fix a bug or add a feature benefits every consuming project at once, instead of the same code being copied and maintained separately in each. This only pays off once there's more than one project sharing it. A solo, single-project setup gets no benefit from splitting anything out this way.",
  },
  { type: 'heading', text: 'What it owns' },
  {
    type: 'paragraph',
    text: 'Generic database functions every consuming project uses instead of writing raw queries directly, a small set of shared primitive components (see the Components tab) and full UI panels (see the UI Components tab), its own database tables and a per-user server-side cache (see the Tables tab), and a shared logging table (see the Logging tab).',
  },
  { type: 'heading', text: 'Where this shows up elsewhere in this setup' },
  {
    type: 'table',
    headers: ['Where', 'Description'],
    rows: [
      ['The audit skill', 'Orchestrates a rollout of a change across every consuming project'],
      [
        'The onboarding and version-pinning skills',
        'Integrate this package into a project, and pin every consuming project to the same version',
      ],
      [
        'The x-prefix table-naming convention',
        'Covered on the Naming conventions sub-tab (under Conventions)',
      ],
      [
        'The component sub-element prop-naming convention (className/labelClass/titleClass/containerClass)',
        'Also on the Naming conventions sub-tab (under Conventions)',
      ],
    ],
  },
]
