import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: [{ bold: '/audit' }, ' is a trigger which executes the Claude skill called ', { bold: 'audit' }, '.'],
  },
  {
    type: 'paragraph',
    text: "Nextjs-shared-only. Orchestrates a cross-project audit and rollout from a shared-package session: audits each consuming project read-only, plans the shared package's own changes if needed, then presents a per-project change list for agreement.",
  },
  {
    type: 'paragraph',
    text: "Once a project's changes are agreed, it creates that project's own plan file, implements it via that project's own code skill, and commits it via that project's own commit skill, all inside that project's own repo.",
  },
  {
    type: 'paragraph',
    text: "Only possible via a scoped, time-limited exception in the project-isolation guard: while an audit is active (capped at 4 hours) and names a project, edits into that project are allowed from the shared-package session. Everywhere else, and at every other time, project isolation is absolute, no exceptions. The exception is deleted once the run ends.",
  },
]
