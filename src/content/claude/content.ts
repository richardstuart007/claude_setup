import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  { type: 'heading', text: 'noprompt' },
  {
    type: 'paragraph',
    text: "Adds an exact-command exception to the permission-exceptions mechanism so that one specific command stops triggering a permission prompt, while everything else in its family still asks. If no command is given inline, asks which exact command to exempt.",
  },
  {
    type: 'paragraph',
    text: "Runs immediately, no confirmation, including for destructive-category commands (force-push, hard reset, branch deletion, cleaning untracked files, destructive SQL, killing processes), though those are flagged explicitly in the report.",
  },
  { type: 'heading', text: 'safe-install' },
  {
    type: 'paragraph',
    text: ['There is no fixed trigger for the Claude skill called ', { bold: 'safe-install' }, '; it runs automatically, matching the situation.'],
  },
  {
    type: 'paragraph',
    text: "Explains what's being installed and why before running any install or download, rather than being invoked by name.",
  },
  { type: 'heading', text: 'new-project' },
  {
    type: 'paragraph',
    text: ['There is no fixed trigger for the Claude skill called ', { bold: 'new-project' }, '; it runs automatically, matching the situation.'],
  },
  {
    type: 'paragraph',
    text: "Scaffolds a brand-new project, following this workspace's conventions. Next.js-specific mechanics, but the underlying idea (one skill that scaffolds new projects consistently) transfers to any stack.",
  },
  { type: 'heading', text: 'db-naming' },
  {
    type: 'paragraph',
    text: ['There is no fixed trigger for the Claude skill called ', { bold: 'db-naming' }, '; it runs automatically, matching the situation.'],
  },
  {
    type: 'paragraph',
    text: "Enforces this setup's table/column naming convention when a table or column is added, and handles Postgres's lack of in-place column reordering (backup, drop, recreate, copy back). Postgres-specific mechanics; the naming-discipline idea itself transfers even where the mechanics don't.",
  },
  { type: 'heading', text: 'onboarding' },
  {
    type: 'paragraph',
    text: ['There is no fixed trigger for the Claude skill called ', { bold: 'onboarding' }, '; it runs automatically, matching the situation.'],
  },
  {
    type: 'paragraph',
    text: "Integrates the shared package into a project, and pins every consuming project to the same version of it. Tied entirely to this author's own shared-package, multi-project workspace; unlikely to be useful as-is outside it.",
  },
]
