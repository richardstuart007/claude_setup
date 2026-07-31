import type { ContentBlock } from '@/content/ContentBlock'

export const content: ContentBlock[] = [
  {
    type: 'paragraph',
    text: [{ bold: '/commit' }, ' is a trigger which executes the Claude skill called ', { bold: 'commit' }, '.'],
  },
  {
    type: 'paragraph',
    text: "Runs once the user has tested and is satisfied. First confirms any manual database changes for the task have actually been run. Since the plan file where that's recorded is about to be deleted, this is the last point where an unconfirmed manual step is still tracked anywhere.",
  },
  {
    type: 'paragraph',
    text: 'Then: bumps the version, stages and commits everything, not just the files the plan mentions. A narrower staging approach once caused a lockfile to go uncommitted and broke a production build. Then pushes.',
  },
  {
    type: 'paragraph',
    text: "Finally removes the plan file from the repo and commits/pushes that removal too. The plan's content is preserved permanently in git history from the earlier commit; it's just not left lingering as a file in the working tree.",
  },
  {
    type: 'paragraph',
    text: "The version bump and build/check gate are Node/npm-specific (package.json's version field, a type-check pass, a build pass); a different stack would substitute its own version marker and its own check/build step.",
  },
]
