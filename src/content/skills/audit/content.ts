import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'table',
    headers: ['Step', 'Description'],
    rows: [
      [
        '/audit',
        '/audit is a trigger which executes the Claude skill called audit.',
      ],
      [
        'Project discovery',
        "The list of projects is never written down as a fixed array anywhere. It's discovered by scanning a known parent directory for subdirectories that look like a project (e.g. contain a package.json). If a directory shouldn't be treated as a project, it's moved out of that parent directory rather than added to an exclusion list. A separate, differently-located parent directory holds projects that aren't pushed to a shared code host. This is the same principle as never hardcoding a real-world list without confirmation (see Conventions → Coding-style → Restrictions), applied to the one list important enough to enforce structurally instead of just by convention: derive it from the filesystem, every time, rather than letting a written-down copy drift out of date.",
      ],
      [
        'Scope',
        "Nextjs-shared-only. Orchestrates a cross-project audit and rollout from a shared-package session: audits each consuming project read-only, plans the shared package's own changes if needed, then presents a per-project change list for agreement.",
      ],
      [
        'Per-project rollout',
        "Once a project's changes are agreed, it creates that project's own plan file, implements it via that project's own code skill, and commits it via that project's own commit skill, all inside that project's own repo.",
      ],
      [
        'Project-isolation exception',
        "Only possible via a scoped, time-limited exception in the project-isolation guard: while an audit is active (capped at 4 hours) and names a project, edits into that project are allowed from the shared-package session. Everywhere else, and at every other time, project isolation is absolute, no exceptions. The exception is deleted once the run ends.",
      ],
    ],
  },
]
